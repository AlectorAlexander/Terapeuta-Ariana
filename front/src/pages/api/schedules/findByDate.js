// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

const api_base = process.env.NEXT_PUBLIC_API_URL;

export default async function findByDate(req, res) {
  try {
    const requestBody = req.body;
    const response = await axios.post(`${api_base}/schedules/calendar`, requestBody);
    
    if (!response) {throw new Error('Something went wrong');}
    res.status(200).json(response.data);
  }
  catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
    console.log(error.message);
  }
}
