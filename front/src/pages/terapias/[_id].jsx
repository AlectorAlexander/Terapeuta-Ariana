import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from '@/styles/blog/TextBlogId.module.css';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import ArianaContext from '@/context/ArianaContext';
import useSWR from "swr";
import axios from 'axios';
import TerapiaDetails from '@/components/terapy/TerapiaDetails';
import Loading from '@/components/Loading';
import ScheduleAndPayComponent from '@/components/terapy/ScheduleComponent';
import LoginAndRegister from '@/components/user/LoginAndRegister';
// eslint-disable-next-line no-unused-vars
import { signOut } from '@/services/auth';
import PaymenteComponente from '@/components/terapy/paymentComponent';
import convertFromRawToHtmlContent from '@/services/convertFroRawToHtmlContent';
import { EditorState, convertFromRaw } from 'draft-js';
import useAuthentication from '@/hooks/useAuthentication';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const TerapiaDetail = () => {
  const router = useRouter();
  const { _id } = router.query;
  const { terapiaDetails, isUserValidated, phoneNumber, setPhoneNumber, finalDateToPost, setFinalDateToPost, setName, setClientName, clientName,
    setTerapiaToEdition, isAdmin } = useContext(ArianaContext);
  const [item, setItem] = useState(null);
  const [continuar, setContinuar] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [originalTerapyFormat, setOriginalTerapyFormat] = useState(null);
  const [show, setOnHide] = useState(false);

  useAuthentication();

  const onHide = () => {
    setOnHide(false);
  };

  
  const pushToEdition = () => {
    try {
      const rawContent = JSON.parse(originalTerapyFormat.description);
      const content = convertFromRaw(rawContent);
      const textRaw = EditorState.createWithContent(content);
      const {title, image, _id, duracao, price, stripe_id } = item;
      setTerapiaToEdition({
        description: textRaw,
        title,
        image,
        _id,
        duracao,
        price,
        stripe_id });
  
      router.push('/terapias/edit-terapia');
  
    } catch (error) {
      console.error('Erro ao analisar o conteúdo para edição:', error);
    }
  };

  const deleteThePost = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`/api/products/delete/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push('/terapias');
    } catch (error) {
      console.error("Ocorreu um erro ao excluir o post:", error);
    }
  };



  
  const fetch = shouldFetch ? `/api/products/${_id}` : null;
  const { data, error } = useSWR(fetch, fetcher);

  useEffect(() => {
    if (item && item.title) {setName(item.title);}
  }, [item]);

  useEffect(() => {
    if (terapiaDetails && terapiaDetails._id && terapiaDetails._id === _id) {
      setOriginalTerapyFormat(terapiaDetails);
      const terapyFormatted = convertFromRawToHtmlContent(terapiaDetails);
      setItem(terapyFormatted);
    } else {
      if (_id){
        setShouldFetch(true);
      }
    }
  }, [_id, terapiaDetails]);

  useEffect(() => {
    if (data) {
      setOriginalTerapyFormat(data);
      const terapyFormatted = convertFromRawToHtmlContent(data);
      setItem(terapyFormatted);
    }
  }, [data, shouldFetch]);



  useEffect(() => {
    if (continuar && !isUserValidated) {
      setOnHide(true);
    } 
  }, [continuar, isUserValidated]); // Dependências para reação às mudanças destes estados.
  
  /* LÓGICA PRO WHATSAPPMODAL AQUI */

  useEffect(() => {
    if (phoneNumber !== '') {
      localStorage.setItem('clientPhone', phoneNumber);
      setClientName(`${clientName} - Telefone: ${phoneNumber}`);
    }

  }, [phoneNumber]);


  const renderRightComponent = () => {
    if (continuar && isUserValidated ) {
      return <PaymenteComponente product={item} />;
    } 
    else if (!continuar || continuar && !isUserValidated) {
      return (
        <ScheduleAndPayComponent 
          finalDateToPost={finalDateToPost} 
          setFinalDateToPost={setFinalDateToPost} 
          setContinuar={setContinuar} 
          item={item} 
        />
      );
    }
    // Se não entrar em nenhum caso acima, retorna null.
    return null;
  };
  

  const renderDetailsScheduleComponent = () => {
    if (item) {
      return (
        <div className='d-flex justify-content-center flex-wrap'>
          <div className='col-12 col-md-6 p-3 order-2 order-md-1'>
            <TerapiaDetails item={item} />
          </div>
          <div className='col-12 col-md-6 p-3 order-1 order-md-2'>
            {renderRightComponent()}
          </div>
        </div>
      );
    }
    return (<Loading />);
  };
  
  

  if (error) {return <h1 className='h-100'>{error.message}</h1>;}

  return (
    <div className='mt-5'>
      <LoginAndRegister show={show} onHide={onHide} setPhoneNumberProps={setPhoneNumber} />
      {/* <WhatsappModal show={showWhatsAppModal} handleClose={onHideWhatsAppModal}  /> */}
      {renderDetailsScheduleComponent()}
      {isAdmin && <div className={styles.adminIcons}>
        <div onClick={pushToEdition} className={`${styles.icon} icon`}>
          <EditOutlined />
        </div>
        <div onClick={deleteThePost} className={`${styles.icon} icon`}>
          <DeleteOutlined />
        </div>
      </div>}
    </div>
  );
};

export default TerapiaDetail;
