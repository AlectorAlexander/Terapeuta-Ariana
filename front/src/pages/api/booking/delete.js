import stripe from '@/services/stripe';
import axios from 'axios';
const api_base = `http://localhost:${process.env.NEXT_PUBLIC_PORT}`;

const createRefund = async (chargeId) => {
  try {
    const refund = await stripe.refunds.create({
      charge: chargeId,
    });
    console.log('Refund created:', refund.id);
  } catch (error) {
    console.error('Error creating refund:', error.message);
    throw new Error('Erro ao criar reembolso: ' + error.message);
  }
};


const getChargeIdFromPaymentIntent = async (paymentIntentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    // Supondo que cada PaymentIntent resulte em uma única Charge
    const chargeId = paymentIntent.charges.data[0].id;
    return chargeId;
  } catch (error) {
    console.error('Error retrieving PaymentIntent:', error.message);
    return null;
  }
};


export default async function Delete(req, res) {
  try {
    const requestBody = req.body;
    const { paymentIntentId } = requestBody;
    const authHeader = req.headers.authorization;
    const response = await axios.post(`${api_base}/booking/Delete`, requestBody, {
      headers: {
        Authorization: authHeader,
      },
    });
    if (!response) {
      throw new Error('Erro ao excluir agendamento: Resposta vazia');
    }
    if (paymentIntentId) {
      const chargeId = await getChargeIdFromPaymentIntent(paymentIntentId);
      if (chargeId) {
        await createRefund(chargeId);
        console.log('Refund created successfully');
      } else {
        console.log('No charge ID found for PaymentIntent');
        throw new Error('No charge ID found for PaymentIntent'); 
      }
    }
    res.status(204).json(response.data);
  } catch (error) {
    // Tratar erros
    let errorMessage = 'Erro interno do servidor';
    let statusCode = 500;
    if (error.response && error.response.status) {
      statusCode = error.response.status;
      errorMessage = error.response.data.message || error.message;
    } else {
      console.error(error);
    }
    res.status(statusCode).json({ message: errorMessage });
  }
}
