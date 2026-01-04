import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '~/components/ui/button';
import { Alert, AlertDescription } from '~/components/ui/alert';

interface StripePaymentFormProps {
  onSuccess: () => void;
  amount: number;
}

export function StripePaymentForm({ onSuccess, amount }: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/register/payment-success`,
        },
        redirect: 'if_required',
      });

      if (submitError) {
        setError(submitError.message || 'Payment failed');
      } else {
        // Payment successful
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="rounded-lg border p-4">
        <PaymentElement />
      </div>

      <div className="flex flex-col gap-2">
        <Button type="submit" disabled={!stripe || isProcessing} size="lg" className="w-full">
          {isProcessing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Secure payment powered by Stripe
        </p>
      </div>
    </form>
  );
}
