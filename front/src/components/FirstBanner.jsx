import React, { useContext, useEffect, useState } from 'react';
import 'react';
import styles from '../styles/Firstbanner.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router'; // Importando useRouter
import ArianaContext from '@/context/ArianaContext';

function FirstBanner() {    
  const [showSecondAnimation, setShowSecondAnimation] = useState(false);
  const [showThirdAnimation, setShowThirdAnimation] = useState(false);
  const [seconds, setSeconds] = useState(false);
  const { isAdmin } = useContext(ArianaContext);
  const router = useRouter(); // Instância do useRouter



  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSeconds(true);
    }, 3000);

    const timeoutId2 = setTimeout(() => {
      setShowSecondAnimation(true);
    }, 4000);

    const timeoutId3 = setTimeout(() => {
      setShowThirdAnimation(true);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
    };
  }, []);

  const redirectToAdminPanel = () => {
    router.push('/painelAdmin'); // Redirecionar para a página do painel de administração
  };

  return (
    <div className={styles.bio}>
      {seconds && <div className={`${styles.photoContainer} animate__animated animate__fadeIn`}>
        <Image
          src='/ariana.png'
          width={250}
          height={250}
          alt='ariana-photo'
          onClick={isAdmin ? redirectToAdminPanel : null }
        />
      </div>}

      <div className={styles.bioText}>
        {seconds && <h1
          className={`animate__animated animate__fadeInUp ${styles.typeAnimation}`}
          style={{whiteSpace: 'pre-line', fontSize: '32px', display: 'inline-block' }}
        >
            Ariana Castro,
        </h1>}
        {showSecondAnimation && <p
          className={`animate__animated animate__fadeInUp ${styles.typeAnimation2}`}
          style={{whiteSpace: 'pre-line', fontSize: '18px', display: 'inline-block' }}
        >
          Hipnoterapeuta especialista em Neurociências, Terapeuta Holística Espiritualista, e Cartomante.
        </p>}
        {showThirdAnimation && <p
          style={{whiteSpace: 'pre-line', fontSize: '18px', display: 'inline-block' }}
          className={`animate__animated animate__fadeInUp ${styles.typeAnimation2}`}
        >
         O meu objetivo como terapeuta é proporcionar para você uma mudança de mentalidade através de técnicas eficazes que atuam em nível mental, emocional, espiritual e energético.
          Com a minha abordagem, em poucas sessões você estará livre de traumas emocionais que te condicionam a viver ciclos repetitivos, e estará preparado para florescer em todas as áreas da sua vida.

          Você merece uma vida<span> EXTRAORDINÁRIA</span>!
        </p>}
      </div>
    </div>
  );
}

export default FirstBanner;
