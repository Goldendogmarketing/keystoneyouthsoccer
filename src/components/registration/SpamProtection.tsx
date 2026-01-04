import { useState, useEffect } from 'react';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Button } from '~/components/ui/button';
import { RefreshCw, Check, X } from 'lucide-react';

interface SpamProtectionProps {
  onVerified: (verified: boolean) => void;
  error?: string;
}

function generateChallenge() {
  const operations = ['+', '-'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  let num1: number;
  let num2: number;
  let answer: number;

  if (operation === '+') {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    answer = num1 + num2;
  } else {
    num1 = Math.floor(Math.random() * 10) + 5;
    num2 = Math.floor(Math.random() * num1);
    answer = num1 - num2;
  }

  return {
    question: `What is ${num1} ${operation} ${num2}?`,
    answer: answer.toString(),
  };
}

export function SpamProtection({ onVerified, error }: SpamProtectionProps) {
  const [challenge, setChallenge] = useState(() => generateChallenge());
  const [userAnswer, setUserAnswer] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (userAnswer === challenge.answer) {
      setIsVerified(true);
      setShowError(false);
      onVerified(true);
    } else if (userAnswer.length > 0 && userAnswer !== challenge.answer.slice(0, userAnswer.length)) {
      setShowError(true);
      setIsVerified(false);
      onVerified(false);
    } else {
      setShowError(false);
      setIsVerified(false);
      onVerified(false);
    }
  }, [userAnswer, challenge.answer, onVerified]);

  const refreshChallenge = () => {
    setChallenge(generateChallenge());
    setUserAnswer('');
    setIsVerified(false);
    setShowError(false);
    onVerified(false);
  };

  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold">
        Security Verification <span className="text-destructive">*</span>
      </Label>
      <div className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-2">
              Please answer the following question to verify you're human:
            </p>
            <div className="flex items-center gap-3">
              <span className="text-lg font-medium">{challenge.question}</span>
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value.replace(/[^0-9-]/g, ''))}
                className="w-20"
                placeholder="?"
              />
              {isVerified && (
                <div className="flex items-center gap-1 text-success">
                  <Check className="h-5 w-5" />
                  <span className="text-sm">Verified</span>
                </div>
              )}
              {showError && !isVerified && (
                <div className="flex items-center gap-1 text-destructive">
                  <X className="h-5 w-5" />
                  <span className="text-sm">Incorrect</span>
                </div>
              )}
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={refreshChallenge}
            title="Get a new question"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
