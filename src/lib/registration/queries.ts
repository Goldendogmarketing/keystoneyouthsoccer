import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { createRegistration } from '~/server/function/registration/create-registration';
import { getRegistration } from '~/server/function/registration/get-registration';
import { listRegistrations } from '~/server/function/registration/list-registrations';
import { toast } from 'sonner';

export const registrationQueries = {
  all: () => ['registrations'] as const,
  lists: () => [...registrationQueries.all(), 'list'] as const,
  list: () =>
    queryOptions({
      queryKey: registrationQueries.lists(),
      queryFn: async () => await listRegistrations(),
      staleTime: 1000 * 60 * 5, // 5 minutes
    }),
  details: () => [...registrationQueries.all(), 'detail'] as const,
  detail: (id: string) =>
    queryOptions({
      queryKey: [...registrationQueries.details(), id] as const,
      queryFn: async () => await getRegistration({ data: { registrationId: id } }),
      staleTime: 1000 * 60 * 5,
    }),
};

export function useCreateRegistrationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Parameters<typeof createRegistration>[0]['data']) =>
      await createRegistration({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: registrationQueries.lists() });
      toast.success('Registration submitted successfully!');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to submit registration');
    },
  });
}
