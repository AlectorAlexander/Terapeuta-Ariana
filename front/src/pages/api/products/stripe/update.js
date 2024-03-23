import axios from "axios";

const api_base = process.env.NEXT_PUBLIC_API_URL;

export async function updateProduct(requestBody) {
  try {
    const response = await axios.put(`${api_base}/products/updateWithout/${requestBody.productId}`, requestBody);

    if (!response) {
      throw new Error('Alguma coisa fudeu');
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      // Alguma coisa aconteceu na configuração do pedido que disparou um erro
      console.log('Error', error.message);
    }
  }
}

export default async function handleUpdate(req, res) {
  try {
    const result = await updateProduct(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      res.status(error.response.status).json({ message: error.response.data.message || error.message });
    } else if (error.request) {
      console.log(error.request);
      res.status(500).json({ message: "No response from server." });
    } else {
      console.log('Error', error.message);
      res.status(500).json({ message: error.message });
    }
  }
}