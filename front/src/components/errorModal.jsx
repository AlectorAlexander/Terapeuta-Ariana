import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function ErrorModal({error}) {
  const [basicModal, setBasicModal] = useState(false);
  const  [errorMessage, setErrorMessage] = useState();

  const toggleShow = () => setBasicModal(!basicModal);

  useEffect(() => {
    const alreadyInUse = 'Firebase: Error (auth/email-already-in-use).';
    const invalidEmail = 'Firebase: Error (auth/invalid-email).';
    const invalidLoginCredentials = 'Firebase: Error (auth/invalid-login-credentials).';
    if (error) {
      setBasicModal(true);
      const err = error.response?.data.message || error.message;
      if (err === invalidEmail) {
        setErrorMessage('E-mail inválido');
      } else if (err === alreadyInUse) {
        setErrorMessage('E-mail já cadastrado');
      } else if (err === invalidLoginCredentials) {
        setErrorMessage('E-mail ou senha inválidos');
      } else {
        setErrorMessage(err);
      }
    }
  
  }, [error]);

  useEffect(() => {
    const alreadyInUse = 'Firebase: Error (auth/email-already-in-use).';
    const invalidEmail = 'Firebase: Error (auth/invalid-email).';
    if (errorMessage === invalidEmail) {
      console.log('invalidEmail');
    }
    if (errorMessage === alreadyInUse) {
      console.log('alreadyInUse');
    }

  }, [errorMessage]);

  return (
    <>
      <Modal show={basicModal} setshow={setBasicModal} tabIndex='-1'>
        <Modal.Header>
          <Button variant='close' onClick={toggleShow}> 
          </Button>
        </Modal.Header>
        <Modal.Body>{errorMessage || 'Erro inesperado'}</Modal.Body>

        <Modal.Footer>
          <Button varianty='secondary' onClick={toggleShow}>
                Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}