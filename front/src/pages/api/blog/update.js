import axios from 'axios';
const api_base = "http://localhost:3001";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Função de API do Next.js
export default async function updatePostById(req, res) {
  try {
    const authHeader = req.headers.authorization;
    const {_id, content, title, image} = req.body;

    // Construir o corpo da requisição conforme esperado pelo Nest.js
    const requestBody = {
      data: { content, title, image },
    };

    const response = await axios.put(`${api_base}/posts/${_id}`, requestBody, {
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

  