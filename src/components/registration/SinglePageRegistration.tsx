import { useState, useCallback, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Checkbox } from '~/components/ui/checkbox';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { SignatureCapture } from './SignatureCapture';
import { SpamProtection } from './SpamProtection';
import {
  User,
  Users,
  Mail,
  Phone,
  MapPin,
  Shirt,
  Heart,
  MessageSquare,
  Plus,
  Minus,
  CreditCard,
  Shield,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';

// Pricing constants
const RETURNING_PLAYER_FEE = 60;
const NEW_PLAYER_FEE = 80;

// Validation schema with conditional validation
const registrationSchema = z
  .object({
    // Parent/Guardian Contact - FIRST for lead capture
    parentGuardianName: z.string().min(1, 'Parent/Guardian name is required'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(10, 'Valid phone number is required'),

    // Player Information
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    gender: z.enum(['male', 'female'], { required_error: 'Please select gender' }),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),

    // Address
    streetAddress: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().min(5, 'Valid zip code is required'),

    // Returning player
    isReturningPlayer: z.boolean().default(false),
    requestedTeam: z.string().optional(),

    // Required fields
    uniformSize: z.string().min(1, 'Uniform size is required'),

    // Optional fields
    volunteerRole: z.string().optional(),
    comments: z.string().optional(),

    // Additional players
    additionalPlayers: z
      .array(
        z.object({
          firstName: z.string().min(1, 'First name is required'),
          lastName: z.string().min(1, 'Last name is required'),
          gender: z.enum(['male', 'female']),
          dateOfBirth: z.string().min(1, 'Date of birth is required'),
          uniformSize: z.string().min(1, 'Uniform size is required'),
          isReturningPlayer: z.boolean().default(false),
          requestedTeam: z.string().optional(),
        })
      )
      .optional(),

    // Agreements
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms and conditions',
    }),

    // Signature
    signature: z.string().min(1, 'Signature is required'),
  })
  .superRefine((data, ctx) => {
    // If returning player, requested team is required
    if (data.isReturningPlayer && (!data.requestedTeam || data.requestedTeam.trim() === '')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Returning players must specify their team from Fall 2025',
        path: ['requestedTeam'],
      });
    }

    // Validate additional players
    data.additionalPlayers?.forEach((player, index) => {
      if (player.isReturningPlayer && (!player.requestedTeam || player.requestedTeam.trim() === '')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Returning players must specify their team from Fall 2025',
          path: ['additionalPlayers', index, 'requestedTeam'],
        });
      }
    });
  });

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface SinglePageRegistrationProps {
  seasonId: string;
  seasonName: string;
  baseRegistrationFee?: number; // Kept for backwards compatibility, will be ignored
  onSuccess?: (data: RegistrationFormData) => void;
}

const UNIFORM_SIZES = [
  { value: 'youth-s', label: 'Youth Small' },
  { value: 'youth-m', label: 'Youth Medium' },
  { value: 'youth-l', label: 'Youth Large' },
  { value: 'adult-s', label: 'Adult Small' },
  { value: 'adult-m', label: 'Adult Medium' },
  { value: 'adult-l', label: 'Adult Large' },
  { value: 'adult-xl', label: 'Adult XL' },
];

const VOLUNTEER_ROLES = [
  { value: 'coach', label: 'Coach' },
  { value: 'assistant-coach', label: 'Assistant Coach' },
  { value: 'referee', label: 'Referee' },
  { value: 'team-sponsor-150', label: 'Team Sponsor ($150)' },
  { value: 'sign-sponsor-300', label: 'Sign Sponsor ($300)' },
];

// Required fields for progress calculation
const REQUIRED_FIELDS = [
  'parentGuardianName',
  'email',
  'phone',
  'firstName',
  'lastName',
  'gender',
  'dateOfBirth',
  'streetAddress',
  'city',
  'state',
  'zipCode',
  'uniformSize',
  'agreeToTerms',
  'signature',
] as const;

export function SinglePageRegistration({
  seasonId,
  seasonName,
  onSuccess,
}: SinglePageRegistrationProps) {
  const [isSpamVerified, setIsSpamVerified] = useState(false);
  const [additionalPlayerCount, setAdditionalPlayerCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      parentGuardianName: '',
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
      gender: undefined,
      dateOfBirth: '',
      streetAddress: '',
      city: '',
      state: 'FL',
      zipCode: '',
      isReturningPlayer: false,
      requestedTeam: '',
      uniformSize: '',
      volunteerRole: '',
      comments: '',
      additionalPlayers: [],
      agreeToTerms: false,
      signature: '',
    },
    mode: 'onChange',
  });

  // Watch form values for progress and pricing
  const watchedValues = useWatch({ control: form.control });
  const isReturningPlayer = watchedValues.isReturningPlayer;

  // Calculate progress percentage
  const progressPercentage = useMemo(() => {
    let filledCount = 0;
    const totalRequired = REQUIRED_FIELDS.length + (isReturningPlayer ? 1 : 0); // +1 for requestedTeam if returning

    for (const field of REQUIRED_FIELDS) {
      const value = watchedValues[field as keyof typeof watchedValues];
      if (field === 'agreeToTerms') {
        if (value === true) filledCount++;
      } else if (field === 'gender') {
        if (value && value !== undefined) filledCount++;
      } else if (typeof value === 'string' && value.trim() !== '') {
        filledCount++;
      }
    }

    // Check requestedTeam if returning player
    if (isReturningPlayer && watchedValues.requestedTeam?.trim()) {
      filledCount++;
    }

    return Math.round((filledCount / totalRequired) * 100);
  }, [watchedValues, isReturningPlayer]);

  // Calculate player fee based on returning status
  const getPrimaryPlayerFee = () => {
    return isReturningPlayer ? RETURNING_PLAYER_FEE : NEW_PLAYER_FEE;
  };

  // Calculate total price including additional players
  const calculateTotalPrice = () => {
    let total = getPrimaryPlayerFee();

    const additionalPlayers = watchedValues.additionalPlayers || [];
    for (const player of additionalPlayers) {
      total += player.isReturningPlayer ? RETURNING_PLAYER_FEE : NEW_PLAYER_FEE;
    }

    return total;
  };

  const totalPrice = calculateTotalPrice();

  const handleAddPlayer = () => {
    if (additionalPlayerCount < 5) {
      setAdditionalPlayerCount((prev) => prev + 1);
      const currentPlayers = form.getValues('additionalPlayers') || [];
      form.setValue('additionalPlayers', [
        ...currentPlayers,
        {
          firstName: '',
          lastName: '',
          gender: 'male',
          dateOfBirth: '',
          uniformSize: '',
          isReturningPlayer: false,
          requestedTeam: '',
        },
      ]);
    }
  };

  const handleRemovePlayer = (index: number) => {
    setAdditionalPlayerCount((prev) => prev - 1);
    const currentPlayers = form.getValues('additionalPlayers') || [];
    form.setValue(
      'additionalPlayers',
      currentPlayers.filter((_, i) => i !== index)
    );
  };

  const handleSpamVerified = useCallback((verified: boolean) => {
    setIsSpamVerified(verified);
  }, []);

  const onSubmit = async (data: RegistrationFormData) => {
    if (!isSpamVerified) {
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('Registration data:', data);
      console.log('Season ID:', seasonId);
      console.log('Total:', totalPrice);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      onSuccess?.(data);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 py-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">Player Registration</h1>
        <p className="mt-2 text-lg text-muted-foreground">{seasonName}</p>
      </div>

      {/* Progress Bar */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 py-4 -mx-4 px-4 border-b">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Registration Progress</span>
            <span className="text-sm font-medium text-primary">{progressPercentage}% Complete</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          {progressPercentage === 100 && (
            <p className="text-sm text-success mt-2 text-center">
              All required fields complete! Review and submit below.
            </p>
          )}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Parent/Guardian Contact - FIRST for lead capture */}
          <Card className="border-primary/50">
            <CardHeader className="bg-primary/5">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Parent/Guardian Contact</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                We'll use this information to keep you updated on registration and the season
              </p>
            </CardHeader>
            <CardContent className="grid gap-6 pt-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="parentGuardianName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Full Name <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email Address <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input className="pl-10" placeholder="email@example.com" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Cell Phone <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input className="pl-10" placeholder="(555) 555-5555" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Player Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Player Information</h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Returning Player Toggle */}
              <FormField
                control={form.control}
                name="isReturningPlayer"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4 bg-muted/30">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none flex-1">
                      <FormLabel className="text-base font-medium flex items-center gap-2">
                        <RotateCcw className="h-4 w-4 text-primary" />
                        Returning Player from Fall 2025
                      </FormLabel>
                      <FormDescription>
                        Check this box if your player participated in the Fall 2025 season and is returning to the same team.
                        <span className="block mt-1 font-medium text-success">
                          Returning players: ${RETURNING_PLAYER_FEE} | New players: ${NEW_PLAYER_FEE}
                        </span>
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {/* Returning Player Notice */}
              {isReturningPlayer && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-amber-800 dark:text-amber-200">
                        Returning Player Notice
                      </p>
                      <p className="mt-1 text-amber-700 dark:text-amber-300">
                        Player must use their uniform from the Fall 2025 season. No new uniform will be issued.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Player First Name <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Player Last Name <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Gender <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Date of Birth <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="uniformSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex items-center gap-2">
                          <Shirt className="h-4 w-4" />
                          Uniform Size <span className="text-destructive">*</span>
                        </div>
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {UNIFORM_SIZES.map((size) => (
                            <SelectItem key={size.value} value={size.value}>
                              {size.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requestedTeam"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {isReturningPlayer ? (
                          <>
                            Team from Fall 2025 <span className="text-destructive">*</span>
                          </>
                        ) : (
                          'Requested Team (optional)'
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            isReturningPlayer
                              ? 'Enter your team name from Fall 2025'
                              : 'Team name or coach name'
                          }
                          {...field}
                        />
                      </FormControl>
                      {isReturningPlayer && (
                        <FormDescription>
                          Required for returning players to ensure proper team placement
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Mailing Address */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Mailing Address</h2>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="streetAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Street Address <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main Street" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      City <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Keystone Heights" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        State <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="FL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Zip Code <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="32656" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Volunteer Opportunities */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Volunteer Opportunities</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Help make our program great! Consider volunteering this season.
              </p>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="volunteerRole"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a volunteer role (optional)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {VOLUNTEER_ROLES.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Additional Players */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Additional Players</h2>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddPlayer}
                  disabled={additionalPlayerCount >= 5}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Player
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Register siblings or additional players (Returning: ${RETURNING_PLAYER_FEE} | New: ${NEW_PLAYER_FEE})
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {additionalPlayerCount === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No additional players added. Click "Add Player" to register more players.
                </p>
              )}

              {Array.from({ length: additionalPlayerCount }).map((_, index) => {
                const additionalPlayerReturning = watchedValues.additionalPlayers?.[index]?.isReturningPlayer;

                return (
                  <div key={index} className="rounded-lg border p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Additional Player {index + 1}</h3>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemovePlayer(index)}
                      >
                        <Minus className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </div>

                    {/* Returning Player Toggle for Additional Player */}
                    <FormField
                      control={form.control}
                      name={`additionalPlayers.${index}.isReturningPlayer`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Returning Player from Fall 2025 (${RETURNING_PLAYER_FEE})
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    {additionalPlayerReturning && (
                      <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-3 text-sm">
                        <p className="text-amber-700 dark:text-amber-300">
                          Player must use their uniform from Fall 2025 season.
                        </p>
                      </div>
                    )}

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name={`additionalPlayers.${index}.firstName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              First Name <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Enter first name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`additionalPlayers.${index}.lastName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Last Name <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Enter last name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`additionalPlayers.${index}.gender`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Gender <span className="text-destructive">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`additionalPlayers.${index}.dateOfBirth`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Date of Birth <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`additionalPlayers.${index}.uniformSize`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Uniform Size <span className="text-destructive">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {UNIFORM_SIZES.map((size) => (
                                  <SelectItem key={size.value} value={size.value}>
                                    {size.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`additionalPlayers.${index}.requestedTeam`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {additionalPlayerReturning ? (
                                <>
                                  Team from Fall 2025 <span className="text-destructive">*</span>
                                </>
                              ) : (
                                'Requested Team (optional)'
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={
                                  additionalPlayerReturning
                                    ? 'Enter team name from Fall 2025'
                                    : 'Team name or coach name'
                                }
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Comments */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Additional Comments</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Leave any notes or special requests for our team (optional)
              </p>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Any special requests, medical notes, or other information you'd like us to know..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Legal Disclaimer & Terms */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Terms & Conditions</h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border bg-muted/30 p-4 max-h-64 overflow-y-auto">
                <h3 className="font-semibold mb-2">
                  Informed Consent, Liability Waiver & Insurance Notice
                </h3>
                <div className="text-sm text-muted-foreground space-y-4">
                  <p>
                    <strong>[PLACEHOLDER - LEGAL DISCLAIMER]</strong>
                  </p>
                  <p>
                    This section will contain the official informed consent, liability waiver,
                    and insurance notice from the Keystone Youth Soccer Club legal team.
                  </p>
                  <p>
                    By checking the box below and signing, you acknowledge that you have read,
                    understand, and agree to all terms and conditions, including but not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Assumption of risk for participation in soccer activities</li>
                    <li>Release and waiver of liability</li>
                    <li>Consent for emergency medical treatment</li>
                    <li>Photo/video release for promotional purposes</li>
                    <li>Agreement to follow all club rules and regulations</li>
                    <li>Understanding of refund and cancellation policies</li>
                  </ul>
                  <p className="italic">[Full legal language to be provided by legal team]</p>
                </div>
              </div>

              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I have read and agree to the terms and conditions, liability waiver, and
                        informed consent above. <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Signature Section */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Parent/Guardian Signature</h2>
              <p className="text-sm text-muted-foreground">
                As the parent or legal guardian, your signature is required to complete registration
              </p>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="signature"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SignatureCapture
                        value={field.value}
                        onChange={field.onChange}
                        signerName={watchedValues.parentGuardianName || ''}
                        error={form.formState.errors.signature?.message}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Spam Protection */}
          <Card>
            <CardContent className="pt-6">
              <SpamProtection
                onVerified={handleSpamVerified}
                error={
                  !isSpamVerified && form.formState.isSubmitted
                    ? 'Please complete the verification'
                    : undefined
                }
              />
            </CardContent>
          </Card>

          {/* Order Summary & Payment */}
          <Card className="border-primary">
            <CardHeader className="bg-primary/5">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>
                    Primary Player ({isReturningPlayer ? 'Returning' : 'New'})
                  </span>
                  <span>${getPrimaryPlayerFee().toFixed(2)}</span>
                </div>
                {watchedValues.additionalPlayers?.map((player, index) => (
                  <div key={index} className="flex justify-between text-muted-foreground">
                    <span>
                      Additional Player {index + 1} ({player.isReturningPlayer ? 'Returning' : 'New'})
                    </span>
                    <span>${(player.isReturningPlayer ? RETURNING_PLAYER_FEE : NEW_PLAYER_FEE).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Due</span>
                    <span className="text-primary">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
                <p>
                  Payment will be processed securely through Authorize.net. You will be redirected
                  to complete payment after submitting this form.
                </p>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting || !isSpamVerified}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Proceed to Payment - ${totalPrice.toFixed(2)}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
