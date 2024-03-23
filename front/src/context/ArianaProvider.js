// context/MeuProvedor.js
import React, { useState } from 'react';
import ArianaContext from './ArianaContext';

const ArianaProvider = ({ children }) => {
  const [terapiaDetails, setTerapiaDetails] = useState(null);
  const [BlogsText, setBlogsText] = useState(null);
  const [finalDateToPost, setFinalDateToPost] = useState(null);
  const [isUserValidated, setIsUserValidated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sessionName, setName] = useState(false);
  const [token, setToken] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [clientName, setClientName] = useState(false);
  const [postToEdition, setPostToEdition] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [terapiaToEdition, setTerapiaToEdition] = useState(false);

  const axios = require('axios'); // Importe o Axios se ainda não estiver importado

  const requestPosts = async () => {
    try {
      const response = await axios.get('/api/blog'); // Usando axios.get em vez de fetch
      return response.data;
    } catch (error) {
      // Tratar o erro aqui, por exemplo, exibindo uma mensagem de erro ao usuário
      console.error("Ocorreu um erro ao buscar os posts:", error);
      throw error; // Você pode optar por lançar o erro novamente se desejar que quem chama a função lide com ele
    }
  };

  const providers = {
    terapiaToEdition, 
    setTerapiaToEdition,
    phoneNumber, 
    setPhoneNumber,
    BlogsText, 
    setBlogsText,
    sessionName, 
    isAdmin,
    requestPosts,
    setIsAdmin,
    token,
    notifications, 
    setNotifications,
    setToken,
    clientName, 
    setClientName,
    setName,
    terapiaDetails,
    setTerapiaDetails,
    isUserValidated,
    finalDateToPost, 
    setFinalDateToPost,
    setIsUserValidated,
    postToEdition,
    setPostToEdition
  };

  return (
    <ArianaContext.Provider value={providers}>
      {children}
    </ArianaContext.Provider>
  );
};

export default ArianaProvider;
