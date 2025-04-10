import { useContext, useEffect } from 'react';
import ArianaContext from '@/context/ArianaContext';
import validateToken from '@/services/validateToken';

const useAuthentication = () => {
  const {
    setIsUserValidated,
    setIsAdmin,
    setClientName,
    setToken,
    isUserValidated,
    token,
    clientName,
    isAdmin,
  } = useContext(ArianaContext);

  useEffect(() => {
    
    const authenticateUser = async () => {
      const storedToken = localStorage.getItem('authToken');
      console.log('[FRONT] Token armazenado no localStorage:', storedToken); // << LOG

      if (!storedToken) {
        console.log('[FRONT] Nenhum token encontrado. Usuário não autenticado.'); // << LOG
        setIsUserValidated(false);
        return;
      }

      try {
        const validationResult = await validateToken(storedToken);
        console.log('[FRONT] Resultado da validação do token:', validationResult); // << LOG

        if (validationResult.isValid) {
          localStorage.setItem('authToken', storedToken);
          setToken(storedToken);
          setIsUserValidated(true);
          setClientName(validationResult.user.name);
          setIsAdmin(validationResult.user.isAdmin);
          console.log('[FRONT] Usuário autenticado com sucesso.'); // << LOG
        } else {
          localStorage.removeItem('authToken');
          setIsUserValidated(false);
          setToken('');
          console.log('[FRONT] Token inválido. Sessão encerrada.'); // << LOG
        }
      } catch (error) {
        console.error('[FRONT] Erro na autenticação do usuário:', error); // << LOG
        localStorage.removeItem('authToken');
        setIsUserValidated(false);
        setToken('');
      }
    };

    if (!isUserValidated) {
      authenticateUser();
    }
  }, [
    isUserValidated,
    setIsUserValidated,
    setIsAdmin,
    setClientName,
    setToken,
    token,
    clientName,
    isAdmin,
  ]);
};

export default useAuthentication;
