import { createFileRoute } from '@tanstack/react-router';
import { SignInForm } from '~/components/auth/SignInForm';

export const Route = createFileRoute('/auth/sign-in')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <SignInForm />
    </div>
  );
}
