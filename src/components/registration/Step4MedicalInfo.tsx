import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { medicalInfoSchema, type MedicalInfoData } from '~/lib/registration/validation';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '~/components/ui/form';

interface Step4MedicalInfoProps {
  data?: Partial<MedicalInfoData>;
  onNext: (data: MedicalInfoData) => void;
  onBack: () => void;
}

export function Step4MedicalInfo({ data, onNext, onBack }: Step4MedicalInfoProps) {
  const form = useForm<MedicalInfoData>({
    resolver: zodResolver(medicalInfoSchema),
    defaultValues: data || {},
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Medical Information</h2>
        <p className="text-muted-foreground">Important health details for your child's safety</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)} className="space-y-4">
          <FormField control={form.control} name="allergies" render={({ field }) => (
            <FormItem>
              <FormLabel>Allergies</FormLabel>
              <FormControl><Textarea placeholder="List any known allergies (food, medication, etc.)" {...field} /></FormControl>
              <FormDescription>Leave blank if none</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="medicalConditions" render={({ field }) => (
            <FormItem>
              <FormLabel>Medical Conditions</FormLabel>
              <FormControl><Textarea placeholder="List any medical conditions (asthma, diabetes, etc.)" {...field} /></FormControl>
              <FormDescription>Leave blank if none</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="medicalNotes" render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Medical Notes</FormLabel>
              <FormControl><Textarea placeholder="Any other important medical information" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <div className="grid gap-4 md:grid-cols-2">
            <FormField control={form.control} name="insuranceProvider" render={({ field }) => (
              <FormItem><FormLabel>Insurance Provider *</FormLabel><FormControl><Input placeholder="Blue Cross, Aetna, etc." {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="insurancePolicyNumber" render={({ field }) => (
              <FormItem><FormLabel>Policy Number *</FormLabel><FormControl><Input {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
            )} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField control={form.control} name="physicianName" render={({ field }) => (
              <FormItem><FormLabel>Physician Name *</FormLabel><FormControl><Input {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="physicianPhone" render={({ field }) => (
              <FormItem><FormLabel>Physician Phone *</FormLabel><FormControl><Input type="tel" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
            )} />
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onBack} size="lg">Back</Button>
            <Button type="submit" size="lg" className="flex-1">Next: Review & Sign</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
