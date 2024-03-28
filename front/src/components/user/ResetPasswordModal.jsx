import { sendResetEmail } from '@/services/auth';
import { isValidEmail } from '@/services/validatesForms';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export default function ResetPasswordModal({basicModal, setBasicModal, toggleShow}) {                
  
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    await sendResetEmail(email);
    toggleShow();
  };

  return (
    <>
      <Modal show={basicModal} setshow={setBasicModal} tabIndex='-1'>
        <Modal.Header>
          <Button variant='close' onClick={toggleShow}> 
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className='d-flex flex-column'>
          Enviaremos um link de alteração de senha para seu e-mail:
                {email.length > 0 ? (isValidEmail(email) ? '  ✔ ' : '  ⚠ ') : ''}
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              {isValidEmail(email) && (
                <p className='mt-2'>
                  {`Após clicar em "Enviar", verifique seu e-mail e siga as instruções`} 
                </p>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="warning" disabled={!isValidEmail(email)} onClick={handleSubmit}>
            Enviar
          </Button>                     
          <Button varianty='secondary' onClick={toggleShow}>
                Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}