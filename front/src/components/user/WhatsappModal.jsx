import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const WhatsappModal = ({ show, handleClose }) => {
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const regex = /^\([1-9]{2}\)\s9[0-9]{4}-[0-9]{4}$/; // Exemplo: (99) 91234-5678
    setIsPhoneNumberValid(regex.test(phoneNumber));
  }, [phoneNumber]);


  const formatPhoneNumber = (value) => {
    let numericValue = value.replace(/\D/g, '');
    
    // Ajusta a lógica para remover o hífen e o dígito de forma apropriada
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
    handleClose(phoneNumber);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
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
            A terapeuta entrará em contato com você através do WhatsApp para combinar e intruir detalhes sobre a terapia.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={!isPhoneNumberValid}>
            Enviar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default WhatsappModal;
