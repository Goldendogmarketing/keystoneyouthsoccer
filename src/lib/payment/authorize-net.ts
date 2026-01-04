/**
 * Authorize.net Payment Integration
 *
 * This module provides integration with Authorize.net for payment processing.
 *
 * Environment variables required:
 * - AUTHORIZE_NET_API_LOGIN_ID: Your Authorize.net API Login ID
 * - AUTHORIZE_NET_TRANSACTION_KEY: Your Authorize.net Transaction Key
 * - AUTHORIZE_NET_ENVIRONMENT: 'sandbox' or 'production'
 */

interface AuthorizeNetConfig {
  apiLoginId: string;
  transactionKey: string;
  environment: 'sandbox' | 'production';
}

interface PaymentData {
  cardNumber: string;
  expirationDate: string; // MMYY format
  cardCode: string;
  amount: number;
  customerEmail: string;
  customerFirstName: string;
  customerLastName: string;
  billingAddress: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  description?: string;
  invoiceNumber?: string;
}

interface PaymentResult {
  success: boolean;
  transactionId?: string;
  authCode?: string;
  errorMessage?: string;
  responseCode?: string;
}

// Get the API endpoint based on environment
function getApiEndpoint(environment: 'sandbox' | 'production'): string {
  return environment === 'production'
    ? 'https://api.authorize.net/xml/v1/request.api'
    : 'https://apitest.authorize.net/xml/v1/request.api';
}

/**
 * Process a payment through Authorize.net
 */
export async function processPayment(
  config: AuthorizeNetConfig,
  paymentData: PaymentData
): Promise<PaymentResult> {
  const endpoint = getApiEndpoint(config.environment);

  const requestBody = {
    createTransactionRequest: {
      merchantAuthentication: {
        name: config.apiLoginId,
        transactionKey: config.transactionKey,
      },
      transactionRequest: {
        transactionType: 'authCaptureTransaction',
        amount: paymentData.amount.toFixed(2),
        payment: {
          creditCard: {
            cardNumber: paymentData.cardNumber.replace(/\s/g, ''),
            expirationDate: paymentData.expirationDate,
            cardCode: paymentData.cardCode,
          },
        },
        order: {
          invoiceNumber: paymentData.invoiceNumber || '',
          description: paymentData.description || 'Youth Soccer Registration',
        },
        customer: {
          email: paymentData.customerEmail,
        },
        billTo: {
          firstName: paymentData.customerFirstName,
          lastName: paymentData.customerLastName,
          address: paymentData.billingAddress.address,
          city: paymentData.billingAddress.city,
          state: paymentData.billingAddress.state,
          zip: paymentData.billingAddress.zip,
          country: 'US',
        },
      },
    },
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();

    // Check for successful transaction
    if (
      result.transactionResponse &&
      result.transactionResponse.responseCode === '1'
    ) {
      return {
        success: true,
        transactionId: result.transactionResponse.transId,
        authCode: result.transactionResponse.authCode,
        responseCode: result.transactionResponse.responseCode,
      };
    }

    // Handle error response
    const errorMessage =
      result.transactionResponse?.errors?.[0]?.errorText ||
      result.messages?.message?.[0]?.text ||
      'Payment processing failed';

    return {
      success: false,
      errorMessage,
      responseCode: result.transactionResponse?.responseCode,
    };
  } catch (error) {
    console.error('Authorize.net payment error:', error);
    return {
      success: false,
      errorMessage: 'Failed to process payment. Please try again.',
    };
  }
}

/**
 * Create an Accept.js token for client-side payment form
 * This is the recommended approach for PCI compliance
 */
export function getAcceptJsScript(environment: 'sandbox' | 'production'): string {
  return environment === 'production'
    ? 'https://js.authorize.net/v1/Accept.js'
    : 'https://jstest.authorize.net/v1/Accept.js';
}

/**
 * Validate a credit card number using Luhn algorithm
 */
export function validateCardNumber(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Get card type from card number
 */
export function getCardType(cardNumber: string): string | null {
  const digits = cardNumber.replace(/\D/g, '');

  const patterns: Record<string, RegExp> = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/,
  };

  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(digits)) return type;
  }

  return null;
}

/**
 * Format card number with spaces
 */
export function formatCardNumber(cardNumber: string): string {
  const digits = cardNumber.replace(/\D/g, '');
  const type = getCardType(digits);

  if (type === 'amex') {
    // Amex: 4-6-5 format
    return digits.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3').trim();
  }

  // Default: 4-4-4-4 format
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}
