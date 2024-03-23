import axios from 'axios';

const validateToken = async (token) => {
  try {
    const response = await axios.post('/api/users/validate', { token });

    if (response.status === 200) {
      return response.data; // Assumindo que o servidor retorna { isValid: true, user: {...} }
    } else {
      return { isValid: false };
    }
  } catch (error) {
    console.error("Erro ao validar token", error.response?.data || error.message);
    return { isValid: false };
  }
};

export default validateToken;
