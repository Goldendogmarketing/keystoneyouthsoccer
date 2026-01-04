import { Html, Head, Body, Container, Section, Text, Button, Heading, Hr } from '@react-email/components';

interface PaymentReceiptProps {
  parentName: string;
  playerName: string;
  seasonName: string;
  amount: number;
  registrationId: string;
  paymentDate: string;
}

export function PaymentReceipt({
  parentName,
  playerName,
  seasonName,
  amount,
  registrationId,
  paymentDate,
}: PaymentReceiptProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>✓ Payment Confirmed!</Heading>

          <Text style={text}>Hi {parentName},</Text>

          <Text style={text}>
            Thank you! Your payment has been successfully processed. <strong>{playerName}</strong> is
            now fully registered for the <strong>{seasonName}</strong> season!
          </Text>

          <Section style={receiptBox}>
            <Text style={receiptTitle}>Payment Receipt</Text>
            <Hr style={hr} />
            <Text style={receiptLine}>
              <span style={receiptLabel}>Player:</span>
              <span style={receiptValue}>{playerName}</span>
            </Text>
            <Text style={receiptLine}>
              <span style={receiptLabel}>Season:</span>
              <span style={receiptValue}>{seasonName}</span>
            </Text>
            <Text style={receiptLine}>
              <span style={receiptLabel}>Registration ID:</span>
              <span style={receiptValue}>{registrationId}</span>
            </Text>
            <Text style={receiptLine}>
              <span style={receiptLabel}>Payment Date:</span>
              <span style={receiptValue}>{paymentDate}</span>
            </Text>
            <Hr style={hr} />
            <Text style={receiptTotal}>
              <span style={receiptLabel}>Total Paid:</span>
              <span style={amountPaid}>${amount.toFixed(2)}</span>
            </Text>
          </Section>

          <Text style={text}>
            <strong>What's Next:</strong>
          </Text>
          <Text style={text}>
            • Team assignments will be emailed 2 weeks before the season starts
            <br />
            • Practice and game schedules will be available in your dashboard
            <br />
            • Make sure your player has proper soccer gear (cleats, shin guards)
            <br />• We'll see you on the field!
          </Text>

          <Button style={button} href={`${process.env.BETTER_AUTH_URL}/dashboard`}>
            View Dashboard
          </Button>

          <Text style={footer}>
            Keep this email for your records. Questions? Contact us at 352.473.7777
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

const receiptBox = {
  backgroundColor: '#ffffff',
  border: '2px solid #22c55e',
  borderRadius: '8px',
  margin: '24px 20px',
  padding: '24px',
};

const receiptTitle = {
  color: '#22c55e',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px',
  textAlign: 'center' as const,
};

const receiptLine = {
  color: '#333',
  fontSize: '14px',
  margin: '8px 0',
  display: 'flex',
  justifyContent: 'space-between',
};

const receiptLabel = {
  fontWeight: '500',
  color: '#666',
};

const receiptValue = {
  fontWeight: '600',
  color: '#333',
};

const receiptTotal = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '16px 0 0',
  display: 'flex',
  justifyContent: 'space-between',
};

const amountPaid = {
  color: '#22c55e',
  fontSize: '24px',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '16px 0',
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
