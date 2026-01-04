import { createFileRoute } from '@tanstack/react-router';
import { PasswordResetForm } from '~/components/auth/PasswordResetForm';

export const Route = createFileRoute('/auth/reset-password')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <PasswordResetForm />
    </div>
  );
}
