import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { guardiansSchema, type GuardiansData } from '~/lib/registration/validation';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';

interface Step2GuardianInfoProps {
  data?: Partial<GuardiansData>;
  onNext: (data: GuardiansData) => void;
  onBack: () => void;
}

export function Step2GuardianInfo({ data, onNext, onBack }: Step2GuardianInfoProps) {
  const form = useForm<GuardiansData>({
    resolver: zodResolver(guardiansSchema),
    defaultValues: data || {},
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Guardian Information</h2>
        <p className="text-muted-foreground">Parent or legal guardian details</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
          {/* Primary Guardian */}
          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-semibold">Primary Guardian *</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField control={form.control} name="guardian1.name" render={({ field }) => (
                <FormItem><FormLabel>Full Name *</FormLabel><FormControl><Input {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="guardian1.relationship" render={({ field }) => (
                <FormItem><FormLabel>Relationship *</FormLabel><FormControl><Input placeholder="Mother/Father/Guardian" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="guardian1.phone" render={({ field }) => (
                <FormItem><FormLabel>Phone *</FormLabel><FormControl><Input type="tel" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="guardian1.email" render={({ field }) => (
                <FormItem><FormLabel>Email *</FormLabel><FormControl><Input type="email" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <FormField control={form.control} name="guardian1.address" render={({ field }) => (
              <FormItem><FormLabel>Street Address *</FormLabel><FormControl><Input {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid gap-4 md:grid-cols-3">
              <FormField control={form.control} name="guardian1.city" render={({ field }) => (
                <FormItem><FormLabel>City *</FormLabel><FormControl><Input {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="guardian1.state" render={({ field }) => (
                <FormItem><FormLabel>State *</FormLabel><FormControl><Input placeholder="FL" maxLength={2} {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="guardian1.zipCode" render={({ field }) => (
                <FormItem><FormLabel>ZIP Code *</FormLabel><FormControl><Input {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
          </div>

          {/* Secondary Guardian (Optional) */}
          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-semibold">Second Guardian (Optional)</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField control={form.control} name="guardian2.name" render={({ field }) => (
                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="guardian2.phone" render={({ field }) => (
                <FormItem><FormLabel>Phone</FormLabel><FormControl><Input type="tel" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onBack} size="lg">Back</Button>
            <Button type="submit" size="lg" className="flex-1">Next: Emergency Contacts</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
