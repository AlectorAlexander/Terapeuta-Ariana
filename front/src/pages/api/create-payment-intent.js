import stripe from '@/services/stripe';


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'brl',  
      payment_method_types: ['card', 'boleto'],
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });

  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.raw.message || error.message, error: error.raw.w  });
  }
}
