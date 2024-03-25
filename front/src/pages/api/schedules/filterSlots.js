// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

const api_base = `http://localhost:${process.env.NEXT_PUBLIC_PORT}`;

export default async function filterSlots(req, res) {
  try {
    const requestBody = req.body;
    const response = await axios.post(`${api_base}/schedules/filter-slots`, requestBody);
    
    if (!response) {throw new Error('Something went wrong');}
    res.status(200).json(response.data);
  }
  catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
    console.log(error.message);
  }
}
