import axios from 'axios';
const api_base = `http://localhost:${process.env.NEXT_PUBLIC_PORT}`;

export default async function register(req, res) {
  try {
    const requestBody = req.body;
    const response = await axios.post(`${api_base}/users`, requestBody);
    if (!response) {throw new Error('Alguma coisa fudeu');}
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.response?.data.message || error.message});
    console.log(error.response?.data.message || error.message);
  }
}