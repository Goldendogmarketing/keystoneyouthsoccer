import { createServerFn } from '@tanstack/react-start';
import { resend, FROM_EMAIL } from '~/lib/email/resend';
import { WelcomeEmail } from '~/lib/email/templates/WelcomeEmail';
import { RegistrationConfirmation } from '~/lib/email/templates/RegistrationConfirmation';
import { PaymentReceipt } from '~/lib/email/templates/PaymentReceipt';
import { render } from '@react-email/components';

// Send welcome email when parent signs up
export const sendWelcomeEmail = createServerFn({ method: 'POST' }).handler(
  async ({ data }: { data: { email: string; name: string } }) => {
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: data.email,
        subject: 'Welcome to Keystone Youth Soccer!',
        html: await render(<WelcomeEmail parentName={data.name} />),
      });

      return { success: true };
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      return { success: false, error };
    }
  },
);

// Send registration confirmation
export const sendRegistrationConfirmation = createServerFn({ method: 'POST' }).handler(
  async ({
    data,
  }: {
    data: {
      email: string;
      parentName: string;
      playerName: string;
      seasonName: string;
      registrationId: string;
    };
  }) => {
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: data.email,
        subject: `Registration Submitted for ${data.playerName} - ${data.seasonName}`,
        html: await render(
          <RegistrationConfirmation
            parentName={data.parentName}
            playerName={data.playerName}
            seasonName={data.seasonName}
            registrationId={data.registrationId}
          />,
        ),
      });

      return { success: true };
    } catch (error) {
      console.error('Failed to send registration confirmation:', error);
      return { success: false, error };
    }
  },
);

// Send payment receipt
export const sendPaymentReceipt = createServerFn({ method: 'POST' }).handler(
  async ({
    data,
  }: {
    data: {
      email: string;
      parentName: string;
      playerName: string;
      seasonName: string;
      amount: number;
      registrationId: string;
      paymentDate: string;
    };
  }) => {
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: data.email,
        subject: `Payment Confirmed - ${data.playerName} Registration`,
        html: await render(
          <PaymentReceipt
            parentName={data.parentName}
            playerName={data.playerName}
            seasonName={data.seasonName}
            amount={data.amount}
            registrationId={data.registrationId}
            paymentDate={data.paymentDate}
          />,
        ),
      });

      return { success: true };
    } catch (error) {
      console.error('Failed to send payment receipt:', error);
      return { success: false, error };
    }
  },
);
