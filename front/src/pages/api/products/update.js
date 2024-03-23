import axios from 'axios';
import { getUpdatedProducts, formatTheApiProductsToCompare } from '@/services/compareProducts';
import stripe from '@/services/stripe'; // Ajuste o caminho conforme necessário

const api_base = process.env.NEXT_PUBLIC_API_URL;

export default async function updatePostById(req, res) {
  try {
    const authHeader = req.headers.authorization;
    const { _id, description, duracao, price, title, image, stripe_id } = req.body;

    // Atualização do produto na sua API
    const requestBody = { data: { description, duracao, price, title, image, stripe_id } };
    const response = await axios.put(`${api_base}/products/${_id}`, requestBody, {
      headers: { Authorization: authHeader },
    });

    if (!response.data) {
      throw new Error('Falha na atualização do produto na API');
    }

    // Obter os produtos atualizados da Stripe
    const stripeProducts = await stripe.products.list();
    const apiProducts = formatTheApiProductsToCompare([response.data]);
    
    // Utilizar getUpdatedProducts para sincronizar as informações
    await getUpdatedProducts(stripeProducts.data, apiProducts);

    // Responder com sucesso
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Erro no método updatePostById:', error.response?.data.message || error.message);
    res.status(error.response?.status || 500).json({ message: error.message });
  }
}
