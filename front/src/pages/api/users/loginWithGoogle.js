import axios from 'axios';

const api_base = "http://localhost:3001";

export default async function loginWithGoogle(req, res) {
  try {
    const requestBody = req.body;
    const body = {
      google_id: requestBody.uid,
      email: requestBody.email,
      name: requestBody.displayName,
      profile_photo: requestBody.photoURL,
      phone: requestBody.phoneNumber,
    };
    const response = await axios.post(`${api_base}/users/google-login`, body);
    if (!response) {throw new Error('Alguma coisa fudeu');}
    res.status(200).json(response.data);
  } catch (error) {
    const errMessage = error.response?.data.message || error.message;
    res.status(error.response?.status || 500).json({ message: errMessage});
    console.log(errMessage);
  }
}