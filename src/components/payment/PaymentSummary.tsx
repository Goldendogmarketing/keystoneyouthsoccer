import { Card, CardHeader, CardContent } from '~/components/ui/card';

interface PaymentSummaryProps {
  seasonName: string;
  playerName: string;
  registrationFee: number;
}

export function PaymentSummary({ seasonName, playerName, registrationFee }: PaymentSummaryProps) {
  const processingFee = registrationFee * 0.029 + 0.3; // Stripe fee estimate
  const total = registrationFee + processingFee;

  return (
    <Card>
      <CardHeader className="font-semibold">Payment Summary</CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Season:</span>
          <span className="font-medium">{seasonName}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Player:</span>
          <span className="font-medium">{playerName}</span>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between text-sm">
            <span>Registration Fee</span>
            <span>${registrationFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Processing Fee</span>
            <span>${processingFee.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-between border-t pt-3 text-lg font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
