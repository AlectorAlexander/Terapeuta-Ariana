import axios from 'axios';
const api_base = "http://localhost:3001";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function getProductById(req, res) {
  try {
    const response = await axios.get(`${api_base}/posts/${req.query._id}`);
    if (!response) {throw new Error('Something went wrong');}
    res.status(200).json(response.data);
  }
  catch (error) {
    console.log(error.message);
    res.status(error.response?.status || 500).json({ message: error.message });
  }
  
}
  