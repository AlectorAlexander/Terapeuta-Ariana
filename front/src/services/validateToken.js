import axios from 'axios';

const validateToken = async (token) => {
  console.log('[FRONT] Enviando token para validação:', token);

  try {
    const response = await axios.post('/api/users/validate', { token }); // <--- aqui

    console.log('[FRONT] Resposta da API de validação:', response.data);

    if (response.status === 200) {
      return response.data;
    } else {
      return { isValid: false };
    }
  } catch (error) {
    console.error('[FRONT] Erro ao validar token:', error.response?.data || error.message);
    return { isValid: false };
  }
};


export default validateToken;
