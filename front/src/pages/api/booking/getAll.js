// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'; 


const api_base = "http://localhost:3001";
 
export default async function getSchedules(req, res) {
  try {
    const authHeader = req.headers.authorization;
    const response = await axios.get(`${api_base}/booking/all`, {
      headers: {
        Authorization: authHeader,
      },
    });
    if (!response) {throw new Error('Something went wrong');}
     
    res.status(200).json( response.data);
  }
  catch (error) {
    res.status(error.response?.status || 500).json({ message: error.response?.data.message || error.message});
    console.log(error.response?.data.message || error.message);
  }
}