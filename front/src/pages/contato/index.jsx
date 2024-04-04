import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from '../../styles/Contato.module.scss';
import CarouselComponent from '@/components/CarouselBanner';

const Contato = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');

  const images = [
    '/contatosBanner1.png', 
    '/contatosBanner2.png', 
    '/contatosBanner4.png',
    '/contatosBanner5.png', 
  ];

  const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY;

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailData = {
      to_name: 'Seu Nome',
      from_name: nome,
      message: mensagem,
      reply_to: email,
      subject: assunto
    };

    emailjs.send(serviceId, templateId, emailData, publicKey)
      .then((response) => {
        console.log('Email enviado com sucesso!', response.status, response.text);
      }, (error) => {
        console.error('Erro ao enviar email:', error);
      });

    setNome('');
    setEmail('');
    setAssunto('');
    setMensagem('');
  }; 


  useEffect(() => {
    console.log({
      serviceId ,
      templateId ,
      publicKey
    });
  }, []);


  const emailValidation = email.includes('@') && email.includes('.');
  const buttonValidation = nome !==  '' && emailValidation && assunto !== '' && mensagem !== '';

  return (
    <div className={styles.container} data-type="Contatos">
      <CarouselComponent 
        titleh1="Contato" 
        textp="Conte comigo!" 
        images={images} 
      />
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={`text-center animate__animated animate__swing ${styles.title}`}>Contate-me</h1>
        <div
          className='d-flex w-100'
        >
          <TextField
            className='m-1 w-100'
            required
            color="success"
            id="nome"
            label="Nome"
            variant="outlined"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
          <TextField
            className='m-1 w-100'
            required
            color="success"
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <TextField
          className='w-100 m-1'  
          required
          color="success"
          id="assunto"
          label="Assunto"
          variant="outlined"
          value={assunto}
          onChange={(event) => setAssunto(event.target.value)}
        />
                
        <TextField
          className='w-100 m-1'
          required
          id="mensagem"
          color="success"
          label="Mensagem"
          multiline
          rows={4}
          variant="outlined"
          value={mensagem}
          onChange={(event) => setMensagem(event.target.value)}
        />
        <Button
          disabled={!buttonValidation}
          variant="outlined"
          color="success"
          type="submit"
          className={styles.button}
        >
        Enviar
        </Button>
      </form>
    </div>
  );


}; 

export default Contato;