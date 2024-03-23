import { useContext, useEffect } from 'react';
import ArianaContext from '@/context/ArianaContext';
import validateToken from '@/services/validateToken';

const useAuthentication = () => {
  const { setIsUserValidated, setIsAdmin, setClientName, setToken, isUserValidated, token, clientName, isAdmin } = useContext(ArianaContext);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const storedToken = localStorage.getItem('authToken');
        // Se não houver token, não prossegue com a validação
        if (!storedToken) {
          setIsUserValidated(false);
          return;
        }

        const validationResult = await validateToken(storedToken);

        if (validationResult.isValid) {
          localStorage.setItem('authToken', storedToken); // Garante que o token esteja sempre atualizado
          setToken(storedToken);
          setIsUserValidated(true);
          setClientName(validationResult.user.name);
          setIsAdmin(validationResult.user.isAdmin);
        } else {
          // Se o token for inválido, limpa o localStorage e os estados
          localStorage.removeItem('authToken');
          setIsUserValidated(false);
          setToken('');
        }
      } catch (error) {
        console.error('Erro na autenticação do usuário:', error);
        localStorage.removeItem('authToken');
        setIsUserValidated(false);
        setToken('');
      }
    };

    // Verifica se o usuário já está validado antes de fazer uma nova chamada à API
    if (!isUserValidated) {
      authenticateUser();
    }
  }, [isUserValidated, setIsUserValidated, setIsAdmin, setClientName, setToken, token, clientName, isAdmin]);
};

export default useAuthentication;
