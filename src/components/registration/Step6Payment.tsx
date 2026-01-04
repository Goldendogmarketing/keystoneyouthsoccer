import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '~/lib/stripe/client';
import { StripePaymentForm } from '~/components/payment/StripePaymentForm';
import { PaymentSummary } from '~/components/payment/PaymentSummary';
import { createPaymentIntent } from '~/server/function/payment/create-payment-intent';
import { confirmPayment } from '~/server/function/payment/confirm-payment';
import { Alert, AlertDescription } from '~/components/ui/alert';

interface Step6PaymentProps {
  registrationId: string;
  seasonName: string;
  playerName: string;
  amount: number;
  onSuccess: () => void;
  onBack: () => void;
}

export function Step6Payment({
  registrationId,
  seasonName,
  playerName,
  amount,
  onSuccess,
  onBack,
}: Step6PaymentProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Create payment intent when component mounts
    const initializePayment = async () => {
      try {
        const result = await createPaymentIntent({
          data: {
            registrationId,
            amount,
          },
        });

        setClientSecret(result.clientSecret!);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize payment');
      } finally {
        setIsLoading(false);
      }
    };

    initializePayment();
  }, [registrationId, amount]);

  const handlePaymentSuccess = async () => {
    try {
      await confirmPayment({ data: { registrationId } });
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to confirm payment');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Payment</h2>
          <p className="text-muted-foreground">Loading payment form...</p>
        </div>
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Payment Error</h2>
        </div>
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Complete Payment</h2>
        <p className="text-muted-foreground">Secure your child's spot for the season</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          {clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'stripe',
                },
              }}
            >
              <StripePaymentForm onSuccess={handlePaymentSuccess} amount={amount} />
            </Elements>
          )}
        </div>

        <div className="order-1 lg:order-2">
          <PaymentSummary seasonName={seasonName} playerName={playerName} registrationFee={amount} />
        </div>
      </div>
    </div>
  );
}
