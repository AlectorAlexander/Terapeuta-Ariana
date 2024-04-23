/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { signInWithEmail, signInWithGoogle, signOut, signUpWithEmail } from "@/services/auth";
import ArianaContext from '@/context/ArianaContext';
import ErrorModal from '../errorModal';
import styles from '@/styles/LoginAndRegister.module.css';
import { arePasswordsMatching, isValidEmail, isValidPassword, loginInfosValidate, registerInfosValidate } from '@/services/validatesForms';
import ResetPasswordModal from './ResetPasswordModal';
import Loading from '../Loading';
import useAuthentication from '@/hooks/useAuthentication';
import WhatsappModal from './WhatsappModal';

function LoginAndRegister({onHide, show, setPhoneNumberProps}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerClicked, setRegisterClicked] = useState(false);
  const [name, setName] = useState('');
  const [erro, setError] = useState(null);
  const { setIsUserValidated, setToken, clientName, isUserValidated, setClientName, setIsAdmin } = useContext(ArianaContext); 
  const [basicModal, setBasicModal] = useState(false);
  const [showWhatsappModal, setShowWhatsappModal] = useState(false);
  const [userGoogleData, setUserGoogleData] = useState(null); // 
  const [loading, setLoading] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');


  useEffect(() => {
    const regex = /^\([1-9]{2}\)\s9[0-9]{4}-[0-9]{4}$/; // Exemplo: (99) 91234-5678
    setIsPhoneNumberValid(regex.test(phoneNumber));
  }, [phoneNumber]);


  const formatPhoneNumber = (value) => {
    let numericValue = value.replace(/\D/g, '');
    
    // Isto é especialmente útil para quando o usuário tenta apagar o número antes do hífen
    if (value.endsWith('-') && !numericValue.endsWith('-')) {
      numericValue = numericValue.slice(0, -1);
    }
  
    if (numericValue.length <= 6) {
      // Até 6 dígitos, apenas agrupa os números sem hífen
      return numericValue.replace(/(\d{2})(\d{0,4})/, '($1) $2').trim();
    } else if (numericValue.length <= 10) {
      // De 7 a 10 dígitos, adiciona o hífen após o quarto dígito
      return numericValue.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim();
    } else {
      // Limita a 11 dígitos e formata de acordo com o padrão brasileiro de telefone móvel
      return numericValue.slice(0, 11).replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };
  
  const handlePhoneNumberChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedPhoneNumber);
    setPhoneNumberError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPhoneNumberValid) {
      setPhoneNumberError('Por favor, insira um número de telefone válido.');
      return;
    }
    setPhoneNumberProps(phoneNumber);
    onHide();
  };

  useAuthentication();

  
  const toggleShow = () => {
    setBasicModal(!basicModal);
  };

  const logout = () => {
    signOut();
    setClientName(false);
    setIsAdmin(false);
    setIsUserValidated(false);
    onHide();
  };
  

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const googleResult = await signInWithGoogle();
      setUserGoogleData(googleResult.user);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userGoogleData) {
      doWeNeedWhatappModalINTERROGATION(userGoogleData).then((response) => {
        if (!response) {
          setLoading(false);
          setShowWhatsappModal(!response);
        } else {
          completeGoogleSignIn(userGoogleData).catch(console.error);
        }
        
      });
    }
  }, [userGoogleData]);


  const doWeNeedWhatappModalINTERROGATION = async (userGoogleData) => {
    setLoading(true);
    const response = await axios.post ('/api/users/validatePhoneNumber', {google_id: userGoogleData.uid, ...userGoogleData});
    return response.data;
  }; 

  const handleWhatsappModalClose = (phoneNumber) => {
    if (phoneNumber) {
      completeGoogleSignInWithPhoneNumber(userGoogleData, phoneNumber);
    } else {
      console.log("Número de telefone necessário");
    }
    setShowWhatsappModal(false);
  };

  // Função que recebe phoneNumber como parâmetro
  const completeGoogleSignInWithPhoneNumber = async (userData, phoneNumber) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/loginWithGoogle', {
        ...userData,
        phoneNumber, // Inclua o número de telefone no payload
      });
      localStorage.setItem('authToken', response.data);
      setToken(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
      onHide(); // Feche o modal de login/cadastro
    }
  };

  const completeGoogleSignIn = async (userData) => {
    console.log({ userData });
    try {
      setLoading(true);
      const response = await axios.post('/api/users/loginWithGoogle', userData);
      console.log({ response });
      localStorage.setItem('authToken', response.data);
      setToken(response.data);
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
      onHide(); // Feche o modal de login/cadastro
    }
  };


  

  const handleEmailLogin = async () => {
    setRegisterClicked(false);
    try {
      setLoading(true);
      const result = await signInWithEmail(email, password);
      const body = {...result.user, password};
      let response;
      try {
        response = await axios.post('/api/users/login', body);
        setClientName(body.displayName);
        setToken(response.data);
      } catch (err) {
        console.log('signInWithEmail: ',err);
        const loginError = err.response?.data.message || err.message;
        console.log(loginError);
        if (loginError === 'InvalidCredentials') { 
          response = await axios.put('/api/users/updateByEmail', {email, password});
        } else {
          setError(err);
          throw err;
        } 
        setRegisterClicked(false);
      }
  
      localStorage.setItem('authToken', response.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  

 
  const handleEmailRegister = () => {
    setLoading(true); 
    signUpWithEmail(email, password)
      .then(result => {
        const body = { ...result.user,  password, name, phone: phoneNumber }; 
        return axios.post('/api/users/register', body);
      })
      .then(response => {
        localStorage.setItem('authToken', response.data);
        setClientName(name);
        setToken(response.data);
      })
      .catch(e => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };



  const renderTheRightComponent = () => {
    const theTruth = !loginInfosValidate(email, password);
    if (!registerClicked) {
      return (
        <div className='d-flex flex-wrap justify-content-around mt-3 animate__animated animate__fadeIn'>
          <Button variant="primary" disabled={theTruth} onClick={handleEmailLogin}>
        Login
          </Button>

          <Button variant="success" onClick={() => setRegisterClicked(true)}>
        Registrar
          </Button>

          <Button variant="danger" onClick={handleGoogleLogin}>Login com Google</Button>

          <WhatsappModal show={showWhatsappModal} handleClose={handleWhatsappModalClose} setPhoneNumberProps={setPhoneNumberProps} />
        </div>
      );
    } else {
      const theTruthAboutLogin = !loginInfosValidate(email, password);
      const theTruth = !registerInfosValidate(email, password, confirmPassword, name) || !isPhoneNumberValid;

      return (
        <div className='animate__animated animate__fadeIn'>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>
            Confirmar senha
              {confirmPassword.length > 0 ? (arePasswordsMatching(password, confirmPassword) ? '  ✔ ' : '  ⚠ ') : ''}
            </Form.Label>
            <Form.Control
              type='password'
              placeholder='Digite sua senha'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='userName'>
            <Form.Label>
            Nome
              {name.length > 2 ? '  ✔ ' : ''}
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='Digite seu nome'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
          
          <Modal.Header closeButton>
            <Modal.Title>Informe seu número de telefone do WhatsApp</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="phoneNumber">
                <Form.Label>Número de telefone:</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="(99) 91234-5678"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  required
                />
                {phoneNumberError && <Form.Text className="text-danger">{phoneNumberError}</Form.Text>}
                <Form.Text className="text-muted">
              A terapeuta entrará em contato com você através do WhatsApp para combinar e intruir detalhes sobre a terapia. Fique tranquilo, não compartilharemos seus dados com ninguém.
                </Form.Text>
              </Form.Group>
            </Form>
          </Modal.Body>
          <div className='d-flex flex-wrap justify-content-around mt-3'>
            <Button variant="primary" disabled={theTruthAboutLogin} onClick={handleEmailLogin}>
        Login
            </Button>

            <Button variant="success" disabled={theTruth} onClick={handleEmailRegister}>
        Registrar
            </Button>

            <Button variant="danger" onClick={handleGoogleLogin}>
        Login com Google
            </Button>
          </div>
        </div>);
    }
  };

  function firstName(texto) {
    // Verifica se o texto está vazio ou indefinido
    if (!texto || texto.length === 0) {
      return "";
    }
    
    // Encontra a posição do primeiro espaço na string
    const posicaoEspaco = texto.indexOf(' ');
    
    // Se não houver espaço, retorna o texto completo
    if (posicaoEspaco === -1) {
      return texto;
    }
    
    // Retorna a parte da string antes do primeiro espaço
    return texto.substring(0, posicaoEspaco);
  }

    

  return (
    <Modal show={show} onHide={onHide}>
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Login e Registro</Modal.Title>
        </Modal.Header>
        {loading ? (
          <div className='d-flex justify-content-center align-items-center'>
            <Loading />
          </div>
        ) : !isUserValidated ? (
          <Modal.Body>
            <ResetPasswordModal
              basicModal={basicModal}
              setBasicModal={setBasicModal}
              toggleShow={toggleShow}
            />
            {erro && <ErrorModal setError={setError} error={erro} />}
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="d-flex flex-column">
                  Email
                  {email.length > 0 ? (isValidEmail(email) ? '  ✔ ' : '  ⚠ ') : ''}
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
  
              <Form.Group controlId="formBasicPassword">
                <Form.Label>
                  Senha
                  {password.length > 0 ? (isValidPassword(password) ? '  ✔ ' : '  ⚠ ') : ''}
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <p className={styles.forgotPassword} onClick={toggleShow}>
                Esqueci minha senha
              </p>
              {renderTheRightComponent()}
            </Form>
          </Modal.Body>
        ) : (
          <div className='d-flex justify-content-center flex-column'>
            <h1>{`Você está logado(a), ${firstName(clientName)}!`}</h1>
            <div className='d-flex my-3 justify-content-center'> 
              <Button variant="danger" onClick={logout}>
              Logout
              </Button>
            </div>
          </div>
        )}
        
  
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Fechar
          </Button>
        </Modal.Footer>
      </div> 
    </Modal>
  );
}  

export default LoginAndRegister;
