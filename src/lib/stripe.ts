import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY no está configurado en las variables de entorno');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-08-27.basil',
    typescript: true,
});

export const STRIPE_CONFIG = {
    currency: 'eur' as const,
    paymentMethodTypes: ['card'] as string[],
};

