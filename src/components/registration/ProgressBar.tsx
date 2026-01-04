import { cn } from '~/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export function ProgressBar({ currentStep, totalSteps, steps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full space-y-4">
      {/* Progress Bar */}
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step Indicators - Mobile: Show current step only */}
      <div className="block md:hidden">
        <p className="text-center text-sm font-medium">
          Step {currentStep} of {totalSteps}: {steps[currentStep - 1]}
        </p>
      </div>

      {/* Step Indicators - Desktop: Show all steps */}
      <div className="hidden grid-cols-6 gap-2 md:grid">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={step} className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors',
                  isCompleted && 'border-primary bg-primary text-primary-foreground',
                  isActive && 'border-primary bg-background text-primary',
                  !isActive && !isCompleted && 'border-muted bg-background text-muted-foreground',
                )}
              >
                {isCompleted ? '✓' : stepNumber}
              </div>
              <p
                className={cn(
                  'mt-1 text-xs font-medium',
                  isActive && 'text-foreground',
                  !isActive && 'text-muted-foreground',
                )}
              >
                {step}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
