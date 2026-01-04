import { Card, CardHeader, CardContent, CardFooter } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Calendar, User, DollarSign } from 'lucide-react';
import { Link } from '@tanstack/react-router';

interface RegistrationCardProps {
  registration: {
    id: string;
    status: string;
    paymentStatus: string;
    amount: string;
    createdAt: Date;
  };
  player: {
    firstName: string;
    lastName: string;
  };
  season: {
    name: string;
  };
}

export function RegistrationCard({ registration, player, season }: RegistrationCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500';
      case 'pending_payment':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Confirmed';
      case 'pending_payment':
        return 'Pending Payment';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{season.name}</h3>
            <p className="text-sm text-muted-foreground">
              {player.firstName} {player.lastName}
            </p>
          </div>
          <Badge className={getStatusColor(registration.status)}>
            {getStatusText(registration.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-muted-foreground" />
          <span>
            {player.firstName} {player.lastName}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>Registered {new Date(registration.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span>${parseFloat(registration.amount).toFixed(2)}</span>
        </div>
      </CardContent>
      {registration.status === 'pending_payment' && (
        <CardFooter>
          <Button asChild className="w-full">
            <Link to="/register/success" search={{ registrationId: registration.id }}>
              Complete Payment
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
