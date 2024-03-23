import React from 'react';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import styles from '../styles/Footer.module.css'; // Importado como styles
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className={`${styles.footer} text-light`}> {/* Usando ${styles.footer} */}
      <Container>
        <Row className={`${styles.rowFooter}`}> {/* Usando ${styles.rowFooter} */}
          <Col xs={12} md={6}>
            <p className='w-100'>
              &copy; 2023, Todos os direitos reservados.
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
      </Container>
    </footer>
  );
};

export default Footer;
