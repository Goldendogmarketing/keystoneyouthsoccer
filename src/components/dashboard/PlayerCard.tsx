import { Card, CardHeader, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { User, Edit, Trash2 } from 'lucide-react';

interface PlayerCardProps {
  player: {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    photoUrl?: string | null;
  };
  onEdit?: () => void;
  onDelete?: () => void;
}

export function PlayerCard({ player, onEdit, onDelete }: PlayerCardProps) {
  const age = new Date().getFullYear() - new Date(player.dateOfBirth).getFullYear();

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            {player.photoUrl ? (
              <img
                src={player.photoUrl}
                alt={`${player.firstName} ${player.lastName}`}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-primary" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              {player.firstName} {player.lastName}
            </h3>
            <p className="text-sm text-muted-foreground">
              Age {age} • {player.gender === 'male' ? 'Male' : 'Female'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {onEdit && (
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button variant="outline" size="sm" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          Born: {new Date(player.dateOfBirth).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
}
