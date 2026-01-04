import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emergencyContactsSchema, type EmergencyContactsData } from '~/lib/registration/validation';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';

interface Step3EmergencyContactsProps {
  data?: Partial<EmergencyContactsData>;
  onNext: (data: EmergencyContactsData) => void;
  onBack: () => void;
}

export function Step3EmergencyContacts({ data, onNext, onBack }: Step3EmergencyContactsProps) {
  const form = useForm<EmergencyContactsData>({
    resolver: zodResolver(emergencyContactsSchema),
    defaultValues: data || {},
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Emergency Contacts</h2>
        <p className="text-muted-foreground">Who should we contact in case of emergency?</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-semibold">Primary Emergency Contact *</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField control={form.control} name="contact1.name" render={({ field }) => (
                <FormItem><FormLabel>Full Name *</FormLabel><FormControl><Input {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="contact1.relationship" render={({ field }) => (
                <FormItem><FormLabel>Relationship *</FormLabel><FormControl><Input placeholder="Grandparent/Friend/Neighbor" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="contact1.phone" render={({ field }) => (
                <FormItem><FormLabel>Phone *</FormLabel><FormControl><Input type="tel" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="contact1.email" render={({ field }) => (
                <FormItem><FormLabel>Email (Optional)</FormLabel><FormControl><Input type="email" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
          </div>

          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-semibold">Secondary Emergency Contact *</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField control={form.control} name="contact2.name" render={({ field }) => (
                <FormItem><FormLabel>Full Name *</FormLabel><FormControl><Input {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="contact2.relationship" render={({ field }) => (
                <FormItem><FormLabel>Relationship *</FormLabel><FormControl><Input {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="contact2.phone" render={({ field }) => (
                <FormItem><FormLabel>Phone *</FormLabel><FormControl><Input type="tel" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="contact2.email" render={({ field }) => (
                <FormItem><FormLabel>Email (Optional)</FormLabel><FormControl><Input type="email" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onBack} size="lg">Back</Button>
            <Button type="submit" size="lg" className="flex-1">Next: Medical Information</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
