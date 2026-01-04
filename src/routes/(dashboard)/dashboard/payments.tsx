import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getDashboardPayments } from '~/server/function/dashboard/get-dashboard-payments';
import { Card, CardHeader, CardContent } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Alert, AlertDescription } from '~/components/ui/alert';
import { DollarSign, Calendar, User, CreditCard } from 'lucide-react';

export const Route = createFileRoute('/(dashboard)/dashboard/payments')({
  component: PaymentsPage,
});

function PaymentsPage() {
  const { data: payments, isLoading } = useQuery({
    queryKey: ['dashboard-payments'],
    queryFn: async () => await getDashboardPayments(),
  });

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500';
      case 'pending_payment':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Paid';
      case 'pending_payment':
        return 'Pending';
      case 'failed':
        return 'Failed';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment History</h1>
        <p className="text-muted-foreground">View all your payment transactions</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Loading payments...</div>
        </div>
      ) : payments && payments.length > 0 ? (
        <div className="space-y-4">
          {payments.map((payment) => (
            <Card key={payment.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{payment.season.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {payment.player.firstName} {payment.player.lastName}
                    </p>
                  </div>
                  <Badge className={getPaymentStatusColor(payment.paymentStatus)}>
                    {getPaymentStatusText(payment.paymentStatus)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {payment.player.firstName} {payment.player.lastName}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">${parseFloat(payment.amount).toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(payment.createdAt).toLocaleDateString()}</span>
                </div>
                {payment.stripePaymentIntentId && (
                  <div className="flex items-center gap-2 text-sm">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate text-muted-foreground">
                      Payment ID: {payment.stripePaymentIntentId}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Alert>
          <DollarSign className="h-4 w-4" />
          <AlertDescription>No payment history yet.</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
