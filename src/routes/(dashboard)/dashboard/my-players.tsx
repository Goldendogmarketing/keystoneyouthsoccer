import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPlayers } from '~/server/function/players/get-players';
import { deletePlayer } from '~/server/function/players/delete-player';
import { PlayerCard } from '~/components/dashboard/PlayerCard';
import { AddPlayerDialog } from '~/components/dashboard/AddPlayerDialog';
import { Alert, AlertDescription } from '~/components/ui/alert';
import { Users } from 'lucide-react';

export const Route = createFileRoute('/(dashboard)/dashboard/my-players')({
  component: MyPlayersPage,
});

function MyPlayersPage() {
  const queryClient = useQueryClient();

  const { data: players, isLoading } = useQuery({
    queryKey: ['players'],
    queryFn: async () => await getPlayers(),
  });

  const deletePlayerMutation = useMutation({
    mutationFn: deletePlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
    },
  });

  const handleDeletePlayer = async (playerId: string) => {
    if (confirm('Are you sure you want to delete this player? This action cannot be undone.')) {
      await deletePlayerMutation.mutateAsync({ id: playerId });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Players</h1>
          <p className="text-muted-foreground">Manage your player profiles</p>
        </div>
        <AddPlayerDialog />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Loading players...</div>
        </div>
      ) : players && players.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {players.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onEdit={() => {
                // TODO: Implement edit functionality
                console.log('Edit player:', player.id);
              }}
              onDelete={() => handleDeletePlayer(player.id)}
            />
          ))}
        </div>
      ) : (
        <Alert>
          <Users className="h-4 w-4" />
          <AlertDescription>
            No players yet. Click "Add Player" to create your first player profile.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
