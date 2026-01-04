import { Html, Head, Body, Container, Section, Text, Button, Heading, Hr } from '@react-email/components';

interface RegistrationConfirmationProps {
  parentName: string;
  playerName: string;
  seasonName: string;
  registrationId: string;
}

export function RegistrationConfirmation({
  parentName,
  playerName,
  seasonName,
  registrationId,
}: RegistrationConfirmationProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Registration Submitted!</Heading>

          <Text style={text}>Hi {parentName},</Text>

          <Text style={text}>
            Great news! We've received your registration for <strong>{playerName}</strong> for the{' '}
            <strong>{seasonName}</strong> season.
          </Text>

          <Section style={infoBox}>
            <Text style={infoTitle}>Registration Details</Text>
            <Text style={infoText}>
              <strong>Player:</strong> {playerName}
              <br />
              <strong>Season:</strong> {seasonName}
              <br />
              <strong>Registration ID:</strong> {registrationId}
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={text}>
            <strong>Next Steps:</strong>
          </Text>
          <Text style={text}>
            1. Complete your payment to confirm the registration
            <br />
            2. You'll receive a payment confirmation email once processed
            <br />
            3. Team assignments will be sent 2 weeks before the season starts
            <br />
            4. Mark your calendar for the first practice!
          </Text>

          <Button style={button} href={`${process.env.BETTER_AUTH_URL}/dashboard/registrations`}>
            View Registration Status
          </Button>

          <Text style={footer}>
            Questions about your registration? Contact us at 352.473.7777
            <br />
            Keystone Youth Soccer | Twin Lakes Park, Keystone Heights, FL
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const h1 = {
  color: '#22c55e',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '40px 0 20px',
  padding: '0',
  textAlign: 'center' as const,
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 20px',
};

const infoBox = {
  backgroundColor: '#f0f9ff',
  border: '1px solid #0ea5e9',
  borderRadius: '8px',
  margin: '24px 20px',
  padding: '20px',
};

const infoTitle = {
  color: '#0ea5e9',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 12px',
  textTransform: 'uppercase' as const,
};

const infoText = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '24px 20px',
};

const button = {
  backgroundColor: '#0070f3',
  borderRadius: '5px',
  color: '#fff',
  display: 'block',
  fontSize: '16px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  textDecoration: 'none',
  padding: '12px 20px',
  margin: '24px 20px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '18px',
  margin: '32px 20px 0',
  textAlign: 'center' as const,
};
