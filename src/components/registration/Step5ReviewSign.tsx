import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewSignatureSchema, type ReviewSignatureData, type CompleteRegistrationData } from '~/lib/registration/validation';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Checkbox } from '~/components/ui/checkbox';
import { Card, CardHeader, CardContent } from '~/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '~/components/ui/form';

interface Step5ReviewSignProps {
  registrationData: Partial<CompleteRegistrationData>;
  data?: Partial<ReviewSignatureData>;
  onNext: (data: ReviewSignatureData) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export function Step5ReviewSign({ registrationData, data, onNext, onBack, isSubmitting }: Step5ReviewSignProps) {
  const form = useForm<ReviewSignatureData>({
    resolver: zodResolver(reviewSignatureSchema),
    defaultValues: data || {
      electronicSignature: '',
      agreeToWaiver: false,
      agreeToMedicalRelease: false,
      agreeToCodeOfConduct: false,
      agreeToPhotoRelease: false,
    },
  });

  const { playerInfo, guardians, emergencyContacts, medicalInfo } = registrationData;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Review & Sign</h2>
        <p className="text-muted-foreground">Please review all information and sign below</p>
      </div>

      {/* Review Summary */}
      <div className="space-y-4">
        <Card>
          <CardHeader className="font-semibold">Player Information</CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p><span className="font-medium">Name:</span> {playerInfo?.firstName} {playerInfo?.lastName}</p>
            <p><span className="font-medium">Date of Birth:</span> {playerInfo?.dateOfBirth}</p>
            <p><span className="font-medium">Gender:</span> {playerInfo?.gender}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="font-semibold">Primary Guardian</CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p><span className="font-medium">Name:</span> {guardians?.guardian1?.name}</p>
            <p><span className="font-medium">Phone:</span> {guardians?.guardian1?.phone}</p>
            <p><span className="font-medium">Email:</span> {guardians?.guardian1?.email}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="font-semibold">Emergency Contacts</CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <p className="font-medium">Primary: {emergencyContacts?.contact1?.name}</p>
              <p className="text-muted-foreground">{emergencyContacts?.contact1?.phone}</p>
            </div>
            <div>
              <p className="font-medium">Secondary: {emergencyContacts?.contact2?.name}</p>
              <p className="text-muted-foreground">{emergencyContacts?.contact2?.phone}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="font-semibold">Medical Information</CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p><span className="font-medium">Insurance:</span> {medicalInfo?.insuranceProvider}</p>
            <p><span className="font-medium">Policy #:</span> {medicalInfo?.insurancePolicyNumber}</p>
            {medicalInfo?.allergies && <p><span className="font-medium">Allergies:</span> {medicalInfo.allergies}</p>}
          </CardContent>
        </Card>
      </div>

      {/* Signature Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)} className="space-y-4">
          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-semibold">Required Agreements</h3>

            <FormField control={form.control} name="agreeToWaiver" render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Liability Waiver *</FormLabel>
                  <FormDescription>I agree to the liability waiver and release of claims</FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )} />

            <FormField control={form.control} name="agreeToMedicalRelease" render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Medical Release *</FormLabel>
                  <FormDescription>I authorize medical treatment in case of emergency</FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )} />

            <FormField control={form.control} name="agreeToCodeOfConduct" render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Code of Conduct *</FormLabel>
                  <FormDescription>I agree to abide by the Code of Conduct</FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )} />

            <FormField control={form.control} name="agreeToPhotoRelease" render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Photo Release (Optional)</FormLabel>
                  <FormDescription>I allow photos of my child for promotional purposes</FormDescription>
                </div>
              </FormItem>
            )} />
          </div>

          <FormField control={form.control} name="electronicSignature" render={({ field }) => (
            <FormItem>
              <FormLabel>Electronic Signature *</FormLabel>
              <FormControl><Input placeholder="Type your full legal name" {...field} className="h-12" /></FormControl>
              <FormDescription>By typing your name, you agree this constitutes a legal signature</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onBack} size="lg" disabled={isSubmitting}>Back</Button>
            <Button type="submit" size="lg" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Continue to Payment'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
