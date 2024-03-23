import axios from 'axios';
const api_base = process.env.NEXT_PUBLIC_API_URL;

export default async function byEmail(req, res) {
  try {
    const requestBody = req.body;
    const response = await axios.put(`${api_base}/users/byEmail/`, requestBody);
    if (!response) {throw new Error('Alguma coisa fudeu');}
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.response?.data.message || error.message});
    console.log('updateEmail :',error.response?.data.message || error.message);
  }
}