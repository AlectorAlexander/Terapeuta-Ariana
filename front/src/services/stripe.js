import Stripe from 'stripe';


const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET, {
  apiVersion: '2020-08-27',
});

export default stripe;