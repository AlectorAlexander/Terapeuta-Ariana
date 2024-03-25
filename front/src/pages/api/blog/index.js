// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'; 


const api_base = `http://localhost:${process.env.NEXT_PUBLIC_PORT}`;

export default async function getPosts(req, res) {
  try {
    const response = await axios.get(`${api_base}/posts`);
    if (!response) {throw new Error('Something went wrong');}
    
    const finalResponse = response.data.map((item) => item._doc);
    res.status(200).json(finalResponse);
  }
  catch (error) {
    res.status(error.response?.status || 500).json({ message: error.response?.data.message || error.message});
    console.log(error.response?.data.message || error.message);
  }
}
