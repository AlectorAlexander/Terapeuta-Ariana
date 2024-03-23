import React, { useEffect, useState } from 'react';
import 'react';
import styles from '../styles/Firstbanner.module.css';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';

function FirstBanner() {    
  const [showSecondAnimation, setshowSecondAnimation] = useState(false);
  const [showThirdAnimation, setshowThirdAnimation] = useState(false);
  const [seconds, setSeconds] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSeconds(true);
    }, 3000);
    
    return () => {
      clearTimeout(timeoutId); 
    };
  }, []); 
    
  return (
    <div 
      className={styles.bio} 
    >
      <div className={`${styles.photoContainer} animate__animated animate__fadeIn`}>
        <Image
          src='/ariana.png'
          width={250}
          height={250}
          alt='ariana-photo'
        />
      </div>


      <div className={styles.bioText}>
        {seconds && <TypeAnimation
          sequence={[
            'Eu sou Ariana Castro,',
            0, 
            () => setshowSecondAnimation(true)
          ]}
          className={styles.typeAnimation}
          speed={40}
          wrapper="span"
          cursor={false}
          style={{whiteSpace: 'pre-line', fontSize: '32px', display: 'inline-block' }}
        />}
        {showSecondAnimation && <TypeAnimation
          sequence={[
            'Uma cartomante',
            10, 
            'Uma terapeuta holística',
            'Curo feridas emocionais',
            2000, 
            'Uma terapeuta ThetaHealer especializada em serviços de saúde alternativos e holísticos.',
            2500, 
            () => setshowThirdAnimation(true)
          ]}
          className={styles.typeAnimation2}
          wrapper="span"
          cursor={false}
          deletionSpeed={70}
          speed={60}
          style={{whiteSpace: 'pre-line', fontSize: '16px', display: 'inline-block' }}
        />}
               
        {showThirdAnimation && <TypeAnimation
          sequence={[
            'Além da terapia, sou cartomante, guiando aqueles que buscam clareza em suas vidas. Meu objetivo é ajudar cada um a encontrar sua verdadeira essência. Creio no poder transformador do ThetaHealing, uma técnica que redefine crenças profundas. Sigo o mantra: "A mudança de vida começa com a transformação de crenças e pensamentos". Seja presencial ou online, estou aqui para ajudar a superar obstáculos e viver plenamente.',
            0,
          ]}
          wrapper="span"
          speed={115}
          className={styles.typeAnimation2}
          deletionSpeed={99}
          cursor={true}
          style={{whiteSpace: 'pre-line', fontSize: '16px', display: 'inline-block' }}
        />}
        {<p>
                
        </p>}
      </div>
    </div>

  );
}

export default FirstBanner;