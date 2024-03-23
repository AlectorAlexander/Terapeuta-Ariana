import axios from 'axios';
const api_base = process.env.NEXT_PUBLIC_API_URL;
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// src/pages/api/blog/delete.js
export default async function deletePostById(req, res) {
  try {
    const authHeader = req.headers.authorization;
    const { _id } = req.query; // Captura o _id da URL
  
    const response = await axios.delete(`${api_base}/posts/${_id}`, {
      headers: {
        Authorization: authHeader,
      },
    });
  
    if (!response) {
      throw new Error('Something went wrong');
    }
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.response?.data.message || error.message});
  }
}
  

  