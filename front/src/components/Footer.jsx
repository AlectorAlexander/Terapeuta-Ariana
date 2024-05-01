import React from 'react';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import styles from '../styles/Footer.module.css'; // Importado como styles
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  // Obtém o ano atual
  const year = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} text-light`}> {/* Usando ${styles.footer} */}
      <Container>
        <Row className={`${styles.rowFooter}`}> {/* Usando ${styles.rowFooter} */}
          <Col xs={12} md={6}>
            <p className='w-100'>
              &copy; {year}, Todos os direitos reservados.
            </p>
          </Col>
          <Col className={styles.SocialMedias} xs={12} md={6}>
            <a title="Meu Insta" href="https://www.instagram.com/arianacastro.terapeuta" target="_blank" className="text-light" rel="noreferrer">
              <FaInstagram size={24} />
            </a>
            <a title="Meu whatsapp" href="https://www.tiktok.com/@arianacastro.terapeuta" target="_blank" className="text-light" rel="noreferrer">
              <FaTiktok size={24} />
            </a>
            <a title="Meu whatsapp" href="https://wa.me/5531988446214" target="_blank" className="text-light" rel="noreferrer">
              <AiOutlineWhatsApp size={24} />
            </a>
          </Col>
        </Row>
        <div className='d-flex justify-content-center'>
          <p className='mx-1 font-weight-bold'>Feito com muito amor e carinho por</p>
          <a title="Meu whatsapp" href="https://wa.me/5531973522095" target="_blank" className="text-light" rel="noreferrer">
            Aléctor Alexander
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
