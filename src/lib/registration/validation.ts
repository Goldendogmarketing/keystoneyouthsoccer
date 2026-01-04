import { z } from 'zod';

// Step 1: Player Information
export const playerInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female'], { required_error: 'Gender is required' }),
  photoUrl: z.string().optional(),
});

// Step 2: Guardian Information
export const guardianSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  relationship: z.string().min(1, 'Relationship is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().length(2, 'State must be 2 characters (e.g., FL)'),
  zipCode: z.string().min(5, 'ZIP code must be at least 5 digits'),
  isPrimary: z.boolean().default(false),
});

export const guardiansSchema = z.object({
  guardian1: guardianSchema,
  guardian2: guardianSchema.optional(),
});

// Step 3: Emergency Contacts
export const emergencyContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  relationship: z.string().min(1, 'Relationship is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
});

export const emergencyContactsSchema = z.object({
  contact1: emergencyContactSchema,
  contact2: emergencyContactSchema,
});

// Step 4: Medical Information
export const medicalInfoSchema = z.object({
  allergies: z.string().optional(),
  medicalConditions: z.string().optional(),
  medicalNotes: z.string().optional(),
  insuranceProvider: z.string().min(1, 'Insurance provider is required'),
  insurancePolicyNumber: z.string().min(1, 'Policy number is required'),
  physicianName: z.string().min(2, 'Physician name is required'),
  physicianPhone: z.string().min(10, 'Physician phone is required'),
});

// Step 5: Review & Signature
export const reviewSignatureSchema = z.object({
  electronicSignature: z.string().min(2, 'Please enter your full name as signature'),
  agreeToWaiver: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the waiver to continue',
  }),
  agreeToMedicalRelease: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the medical release to continue',
  }),
  agreeToCodeOfConduct: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the code of conduct to continue',
  }),
  agreeToPhotoRelease: z.boolean().default(false),
});

// Complete registration schema (all steps combined)
export const completeRegistrationSchema = z.object({
  playerInfo: playerInfoSchema,
  guardians: guardiansSchema,
  emergencyContacts: emergencyContactsSchema,
  medicalInfo: medicalInfoSchema,
  reviewSignature: reviewSignatureSchema,
  seasonId: z.string().uuid(),
});

export type PlayerInfoData = z.infer<typeof playerInfoSchema>;
export type GuardianData = z.infer<typeof guardianSchema>;
export type GuardiansData = z.infer<typeof guardiansSchema>;
export type EmergencyContactData = z.infer<typeof emergencyContactSchema>;
export type EmergencyContactsData = z.infer<typeof emergencyContactsSchema>;
export type MedicalInfoData = z.infer<typeof medicalInfoSchema>;
export type ReviewSignatureData = z.infer<typeof reviewSignatureSchema>;
export type CompleteRegistrationData = z.infer<typeof completeRegistrationSchema>;
