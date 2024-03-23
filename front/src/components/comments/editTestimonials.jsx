import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditTestimonials = ({ show, onHide, nomeProp, textoProp, isToEdition, setIsToEdition }) => {
  const [nome, setNome] = useState(nomeProp || '');
  const [texto, setTexto] = useState(textoProp || '');

  useEffect(() => {
    setNome(nomeProp || '');
    setTexto(textoProp || '');
  }, [nomeProp, textoProp]);

  const onSubmit = async () => {
    try {
      if (isToEdition.bool) {
        await axios.put('/api/comments/editTestimonial', { index: isToEdition.index, updatedTestimonial: { name: nome, testimonial: texto } });
        setIsToEdition({bool: false, index: null});
        onHide();
      } else {
        await axios.post('/api/comments/createTestimonial', {newTestimonial: { name: nome, testimonial: texto }});
        onHide();
      }
    } catch (error) {
      console.error("Ocorreu um erro ao enviar o formulário:", error);
      throw error;
    }
  };
  

  const handleSubmit = () => {
    onSubmit();
    onHide();
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
              onChange={(e) => setNome(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="texto">
            <Form.Label>Texto</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Digite o texto"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
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
