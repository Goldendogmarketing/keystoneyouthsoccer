import { Resend } from 'resend';
import { env } from '~/env/server';

// Server-side Resend client
export const resend = new Resend(env.RESEND_API_KEY);

// Default sender
export const FROM_EMAIL = 'Keystone Youth Soccer <noreply@keystoneyouthsoccer.com>';
