import axios from 'axios';

const api_base = `http://localhost:${process.env.NEXT_PUBLIC_PORT}`;

export default async function loginWithGoogle(req, res) {
  try {
    const { google_id, email, name, phoneNumber } = req.body;

    const body = {
      google_id,
      email,
      name,
      phone: phoneNumber,
    };

    const response = await axios.post(`${api_base}/users/google-login`, body);

    if (!response) {
      throw new Error('Falha na resposta do backend ao tentar gerar token.');
    }

    const token = response.data;
    console.log('[BACK] Token retornado do Nest.js:', token); // único log mantido

    res.status(200).json({ token });
  } catch (error) {
    const errMessage = error.response?.data.message || error.message;
    res.status(error.response?.status || 500).json({ message: errMessage });
    console.error('[BACK] Erro completo no loginWithGoogle.js:', error);
  }
}
