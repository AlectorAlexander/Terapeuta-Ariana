// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'; 


const api_base = process.env.NEXT_PUBLIC_API_URL;

export default async function getNotifications(req, res) {
  try {
    const authHeader = req.headers.authorization;
    const response = await axios.get(`${api_base}/notifications`, {
      headers: {
        Authorization: authHeader,
      },
    });
    if (!response) {throw new Error('Something went wrong');}
    const finalResponse = response.data.map((item) => item._doc);
    res.status(200).json(finalResponse);
  }
  catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
    console.log(error.message);
  }
}
