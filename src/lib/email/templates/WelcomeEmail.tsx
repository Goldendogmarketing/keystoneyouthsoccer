import { Html, Head, Body, Container, Section, Text, Button, Heading } from '@react-email/components';

interface WelcomeEmailProps {
  parentName: string;
}

export function WelcomeEmail({ parentName }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Keystone Youth Soccer!</Heading>

          <Text style={text}>Hi {parentName},</Text>

          <Text style={text}>
            Thank you for creating your parent account with Keystone Youth Soccer. We're excited to
            have you join our soccer community!
          </Text>

          <Section style={section}>
            <Text style={text}>
              <strong>Next Steps:</strong>
            </Text>
            <Text style={text}>
              • Register your child for the upcoming season
              <br />
              • Complete payment to secure their spot
              <br />
              • Receive team assignment 2 weeks before the season starts
              <br />• Bring your player to their first practice!
            </Text>
          </Section>

          <Button style={button} href={process.env.BETTER_AUTH_URL}>
            Go to Dashboard
          </Button>

          <Text style={footer}>
            Questions? Contact us at 352.473.7777
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
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 20px',
};

const section = {
  backgroundColor: '#f4f4f4',
  borderRadius: '8px',
  margin: '24px 20px',
  padding: '20px',
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
  lineHeight: '16px',
  margin: '24px 20px',
  textAlign: 'center' as const,
};
