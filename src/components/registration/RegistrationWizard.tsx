import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ProgressBar } from './ProgressBar';
import { Step1PlayerInfo } from './Step1PlayerInfo';
import { Step2GuardianInfo } from './Step2GuardianInfo';
import { Step3EmergencyContacts } from './Step3EmergencyContacts';
import { Step4MedicalInfo } from './Step4MedicalInfo';
import { Step5ReviewSign } from './Step5ReviewSign';
import { Step6Payment } from './Step6Payment';
import type { CompleteRegistrationData } from '~/lib/registration/validation';
import { saveDraft, loadDraft, clearDraft } from '~/lib/registration/draft-storage';
import { useCreateRegistrationMutation } from '~/lib/registration/queries';

interface RegistrationWizardProps {
  seasonId: string;
  seasonName: string;
  registrationFee: number;
}

const STEPS = ['Player', 'Guardians', 'Emergency', 'Medical', 'Review', 'Payment'];

export function RegistrationWizard({ seasonId, seasonName, registrationFee }: RegistrationWizardProps) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<CompleteRegistrationData>>({
    seasonId,
  });

  const createMutation = useCreateRegistrationMutation();

  // Load draft on mount
  useEffect(() => {
    const draft = loadDraft(seasonId);
    if (draft) {
      setFormData((prev) => ({ ...prev, ...draft }));
    }
  }, [seasonId]);

  // Auto-save on data change
  useEffect(() => {
    if (currentStep > 1) {
      saveDraft(seasonId, formData);
    }
  }, [formData, seasonId, currentStep]);

  const handleNext = async (stepData: any, step: number) => {
    let updatedData = { ...formData };

    switch (step) {
      case 1:
        updatedData.playerInfo = stepData;
        break;
      case 2:
        updatedData.guardians = stepData;
        break;
      case 3:
        updatedData.emergencyContacts = stepData;
        break;
      case 4:
        updatedData.medicalInfo = stepData;
        break;
      case 5:
        updatedData.reviewSignature = stepData;
        await handleSubmit({ ...updatedData, reviewSignature: stepData });
        return;
    }

    setFormData(updatedData);
    setCurrentStep(step + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (completeData: Partial<CompleteRegistrationData>) => {
    try {
      const result = await createMutation.mutateAsync({
        seasonId,
        playerData: {
          firstName: completeData.playerInfo!.firstName,
          lastName: completeData.playerInfo!.lastName,
          dateOfBirth: completeData.playerInfo!.dateOfBirth,
          gender: completeData.playerInfo!.gender,
          photoUrl: completeData.playerInfo?.photoUrl,
          allergies: completeData.medicalInfo?.allergies,
          medicalConditions: completeData.medicalInfo?.medicalConditions,
          medicalNotes: completeData.medicalInfo?.medicalNotes,
          insuranceProvider: completeData.medicalInfo!.insuranceProvider,
          insurancePolicyNumber: completeData.medicalInfo!.insurancePolicyNumber,
          physicianName: completeData.medicalInfo!.physicianName,
          physicianPhone: completeData.medicalInfo!.physicianPhone,
        },
        guardiansData: [
          {
            ...completeData.guardians!.guardian1,
            isPrimary: true,
          },
          ...(completeData.guardians?.guardian2?.name
            ? [{ ...completeData.guardians.guardian2, isPrimary: false }]
            : []),
        ],
        emergencyContactsData: [
          { ...completeData.emergencyContacts!.contact1, priority: 'primary' as const },
          { ...completeData.emergencyContacts!.contact2, priority: 'secondary' as const },
        ],
        electronicSignature: completeData.reviewSignature!.electronicSignature,
        amount: registrationFee,
      });

      // Store registration ID and move to payment step
      setRegistrationId(result.registration.id);
      setFormData(completeData);
      setCurrentStep(6);
    } catch (error) {
      console.error('Registration submission failed:', error);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-4 py-8 md:p-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">Register for {seasonName}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Registration Fee: ${registrationFee.toFixed(2)}
        </p>
      </div>

      {/* Progress Bar */}
      <ProgressBar currentStep={currentStep} totalSteps={6} steps={STEPS} />

      {/* Step Content */}
      <div className="rounded-lg border bg-card p-6 md:p-8">
        {currentStep === 1 && (
          <Step1PlayerInfo
            data={formData.playerInfo}
            onNext={(data) => handleNext(data, 1)}
          />
        )}

        {currentStep === 2 && (
          <Step2GuardianInfo
            data={formData.guardians}
            onNext={(data) => handleNext(data, 2)}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && (
          <Step3EmergencyContacts
            data={formData.emergencyContacts}
            onNext={(data) => handleNext(data, 3)}
            onBack={handleBack}
          />
        )}

        {currentStep === 4 && (
          <Step4MedicalInfo
            data={formData.medicalInfo}
            onNext={(data) => handleNext(data, 4)}
            onBack={handleBack}
          />
        )}

        {currentStep === 5 && (
          <Step5ReviewSign
            registrationData={formData}
            data={formData.reviewSignature}
            onNext={(data) => handleNext(data, 5)}
            onBack={handleBack}
            isSubmitting={createMutation.isPending}
          />
        )}

        {currentStep === 6 && registrationId && (
          <Step6Payment
            registrationId={registrationId}
            seasonName={seasonName}
            playerName={`${formData.playerInfo?.firstName} ${formData.playerInfo?.lastName}`}
            amount={registrationFee}
            onSuccess={() => {
              clearDraft(seasonId);
              navigate({ to: '/register/success', search: { registrationId } });
            }}
            onBack={handleBack}
          />
        )}
      </div>

      {/* Auto-save indicator */}
      {currentStep > 1 && (
        <p className="text-center text-sm text-muted-foreground">
          Your progress is automatically saved
        </p>
      )}
    </div>
  );
}
