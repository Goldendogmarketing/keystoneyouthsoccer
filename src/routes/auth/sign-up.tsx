import { createFileRoute } from '@tanstack/react-router';
import { SignUpForm } from '~/components/auth/SignUpForm';

export const Route = createFileRoute('/auth/sign-up')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <SignUpForm />
    </div>
  );
}
