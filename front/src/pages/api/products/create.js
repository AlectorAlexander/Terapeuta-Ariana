import axios from 'axios';
import { formatTheApiProductsToCompare, formatTheApiProductsToCreate } from '@/services/compareProducts';
import stripe from '@/services/stripe'; // Ajuste o caminho conforme necessário

const api_base = process.env.NEXT_PUBLIC_API_URL;

export default async function create(req, res) {
  try {
    const requestBody = req.body;
    const authHeader = req.headers.authorization;

    // Criação do produto na sua API
    const response = await axios.post(`${api_base}/products`, requestBody, {
      headers: {
        Authorization: authHeader,
      },
    });
    if (!response.data) { throw new Error('Falha na criação do produto na API'); }

    // Formatar os dados do produto para o Stripe
    const semiFormattedProduct = formatTheApiProductsToCompare([requestBody])[0];
    const productData = formatTheApiProductsToCreate(semiFormattedProduct);

    // Criação do produto no Stripe
    const stripeProduct = await stripe.products.create(productData);
    if (!stripeProduct) { throw new Error('Falha na criação do produto no Stripe'); }

    // Atualização do produto na sua API com o stripe_id
    const updateResponse = await axios.put(
      `${api_base}/products/${response.data._id}`, 
      { data: { stripe_id: stripeProduct.id }, secret: process.env.NEXT_PUBLIC_APP_SECRET_KEY }, // Adicione outras propriedades necessárias ao objeto 'data' se necessário
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );
    if (!updateResponse.data) { throw new Error('Falha na atualização do produto com stripe_id'); }


    res.status(200).json(updateResponse.data);
  } catch (error) {
    console.error('Erro no método create:', error.response?.data.message || error.message);
    res.status(error.response?.status || 500).json({ message: error.message });
  }
}
