import axios from 'axios';
const api_base = "http://localhost:3001";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function updatePayment(req, res) {
  try {
    const authHeader = req.headers.authorization;
    const {id, data} = req.body;
    
    console.log(id);
    const response = await axios.put(`${api_base}/payment/${id}`, data,
      {
        headers: {
          Authorization: authHeader,
        },
      });
    if (!response) {throw new Error('Something went wrong');}
    res.status(200).json(response.data);
  }
  catch (error) {
    console.log(error.message);
    res.status(error.response?.status || 500).json({ message: error.message });
  }
  
}
  