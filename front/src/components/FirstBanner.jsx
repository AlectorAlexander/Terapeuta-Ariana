import React, { useEffect, useState } from 'react';
import 'react';
import styles from '../styles/Firstbanner.module.css';
import Image from 'next/image';

function FirstBanner() {    
  const [showSecondAnimation, setShowSecondAnimation] = useState(false);
  const [showThirdAnimation, setShowThirdAnimation] = useState(false);
  const [seconds, setSeconds] = useState(false);

  useEffect(() => {

    const timeoutId = setTimeout(() => {
      setSeconds(true);
    }, 3000);

    const timeoutId2 = setTimeout(() => {
      setShowSecondAnimation(true);
    }, 4000); // Mostrar a segunda animação após 4 segundos
    
    const timeoutId3 = setTimeout(() => {
      setShowThirdAnimation(true);
    }, 5000); // Mostrar a terceira animação após 5 segundos

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
    };
  }, []); 
    
  return (
    <div 
      className={styles.bio} 
    >
      {seconds && <div className={`${styles.photoContainer} animate__animated animate__fadeIn`}>
        <Image
          src='/ariana.png'
          width={250}
          height={250}
          alt='ariana-photo'
        />
      </div>} 


      <div className={styles.bioText}>
        {seconds && <h1
          className={`animate__animated  animate__fadeInUp ${styles.typeAnimation}`}
          style={{whiteSpace: 'pre-line', fontSize: '32px', display: 'inline-block' }}
        >
            Eu sou Ariana Castro,
        </h1>}
        {showSecondAnimation && <p
          className={`animate__animated  animate__fadeInUp ${styles.typeAnimation2}`}
          style={{whiteSpace: 'pre-line', fontSize: '18px', display: 'inline-block' }}
        >
          Uma terapeuta ThetaHealer especializada em serviços de saúde alternativos e holísticos.
        </p>}
               
        {showThirdAnimation && <p
          style={{whiteSpace: 'pre-line', fontSize: '18px', display: 'inline-block' }}
          className={`animate__animated  animate__fadeInUp ${styles.typeAnimation2}`}
        >
          Além da terapia, sou cartomante, guiando aqueles que buscam clareza em suas vidas. Objetivo em ajudar cada um a encontrar sua verdadeira essência. Creio no poder transformador do ThetaHealing, uma técnica que redefine crenças profundas. Sigo o mantra: {`"A mudança de vida começa com a transformação de crenças e pensamentos"`}.
        </p>}
        {<p>
                
        </p>}
      </div>
    </div>

  );
}

export default FirstBanner;
