import axios from 'axios';
const api_base = process.env.NEXT_PUBLIC_API_URL;
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Função de API do Next.js
export default async function updateBookingByScheduleId(req, res) {
  try {
    const authHeader = req.headers.authorization;
    const {schedule_id} = req.body;


    // Construir o corpo da requisição conforme esperado pelo Nest.js
    const data =req.body;
    const response = await axios.put(`${api_base}/booking/${schedule_id}`, data, {
      headers: {
        Authorization: authHeader,
      },
    });

    if (!response) {
      throw new Error('Something went wrong');
    }
    res.status(200).json(response.data);
  }
  catch (error) {
    res.status(error.response?.status || 500).json({ message: error.response?.data.message || error.message});
  }
}

  