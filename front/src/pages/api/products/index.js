// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import syncAPIProductsWithStripe from '@/services/compareProducts';
import stripe from '@/services/stripe';
import axios from 'axios'; 


const api_base = process.env.NEXT_PUBLIC_API_URL;

export default async function getProducts(req, res) {
  try {
    const response = await axios.get(`${api_base}/products`);
    if (!response) {throw new Error('Something went wrong');}
    const stripeProducts = await stripe.products.list({
      expand: ['data.default_price'],
      active: true,
    });
    const finalResponse = response.data.map((item) => item._doc);
    syncAPIProductsWithStripe(stripeProducts.data, finalResponse);
    res.status(200).json(finalResponse);
  }
  catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
    console.log(error.message);
  }
}
