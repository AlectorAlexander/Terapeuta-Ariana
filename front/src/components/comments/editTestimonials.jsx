import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditTestimonials = ({ show, onHide, nomeProp, textoProp, isToEdition, setIsToEdition }) => {
  const [nome, setNome] = useState(nomeProp || '');
  const [texto, setTexto] = useState(textoProp || '');
  const [nomeErro, setNomeErro] = useState('');
  const [textoErro, setTextoErro] = useState('');

  useEffect(() => {
    setNome(nomeProp || '');
    setTexto(textoProp || '');
  }, [nomeProp, textoProp]);

  const onSubmit = async () => {
    try {
      if (isToEdition.bool) {
        await axios.put('/api/comments/editTestimonial', { index: isToEdition.index, updatedTestimonial: { name: nome, testimonial: texto } });
        setIsToEdition({ bool: false, index: null });
        onHide();
      } else {
        await axios.post('/api/comments/createTestimonial', { newTestimonial: { name: nome, testimonial: texto } });
        onHide();
      }
    } catch (error) {
      console.error("Ocorreu um erro ao enviar o formulário:", error);
      throw error;
    }
  };

  const handleNomeChange = (e) => {
    const value = e.target.value;
    if (value.length <= 16) {
      setNome(value);
      setNomeErro('');
    } else {
      setNomeErro('O nome não pode ter mais que 16 caracteres');
    }
  };

  const handleTextoChange = (e) => {
    const value = e.target.value;
    if (value.length <= 141) {
      setTexto(value);
      setTextoErro('');
    } else {
      setTextoErro('O texto não pode ter mais que 141 caracteres');
    }
  };

  const handleSubmit = () => {
    if (!nomeErro && !textoErro) {
      onSubmit();
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Formulário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="nome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome"
              value={nome}
              onChange={handleNomeChange}
              isInvalid={!!nomeErro}
            />
            <Form.Control.Feedback type="invalid">
              {nomeErro}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="texto">
            <Form.Label>Texto</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Digite o texto"
              value={texto}
              onChange={handleTextoChange}
              isInvalid={!!textoErro}
            />
            <Form.Control.Feedback type="invalid">
              {textoErro}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Enviar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTestimonials;
