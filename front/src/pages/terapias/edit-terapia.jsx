import React, { useContext, useEffect, useState } from 'react';
import ArianaContext from '@/context/ArianaContext';
import { EditorState, convertToRaw } from 'draft-js';
import styles from '@/styles/blog/BlogEditator.module.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useRouter } from 'next/router';
import useAuthentication from '@/hooks/useAuthentication';

// Importa dinamicamente o Editor, desativando a renderização do lado do servidor
const DynamicEditor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
);

const terapiasEditator = () => {
  const { isAdmin, terapiaToEdition, setTerapiaToEdition, setToken, setTerapiaDetails } = useContext(ArianaContext);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [title, setTitle] = useState('');
  const [duracao, setDuracao] = useState('');
  const [price, setPrice] = useState('');
  const [Image, setImage] = useState('');
  const router = useRouter();
  useAuthentication();

  const hasText = (editorState) => {
    const contentState = editorState.getCurrentContent();
    return contentState.hasText();
  };

  useEffect(() => {
    if (terapiaToEdition) {
      setTitle(terapiaToEdition.title);
      setImage(terapiaToEdition.image);
      setDuracao(terapiaToEdition.duracao);
      setPrice(terapiaToEdition.price);
      setEditorState(terapiaToEdition.description);
    }
  }, [terapiaToEdition]);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;  
    }
  };
  
  const disabledOrNot = title !== '' && hasText(editorState) && isValidUrl(Image);

  const saveTheText = async () => {
    try {
      const contentState = editorState.getCurrentContent();
      const rawContentState = JSON.stringify(convertToRaw(contentState));
      const token = localStorage.getItem('authToken');
      setToken(token); 
      const takeToTheServer = { title, description: rawContentState, image: Image, duracao, price: Number(price)};
      if(terapiaToEdition) {
        await axios.put('/api/products/update', {...takeToTheServer, _id: terapiaToEdition._id, stripe_id: terapiaToEdition.stripe_id}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => setTerapiaDetails(response.data));
        setTerapiaToEdition(null);
        setTitle('');
        setEditorState(EditorState.createEmpty());
        setImage('');
        setDuracao('');
        setPrice('');
        return router.push(`/terapias/${terapiaToEdition._id}`);
      }
      await axios.post('/api/products/create', takeToTheServer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
  
      setTitle('');
      setEditorState(EditorState.createEmpty());
      setImage('');
      setDuracao('');
      setPrice('');

    } catch (error) {
      // Tratar o erro aqui, por exemplo, exibindo uma mensagem de erro ao usuário
      console.error("Ocorreu um erro ao salvar o texto:", error);
    }
  };
  
    
  if (isAdmin) {
    return (
      <div className={styles.container}>
        <input
          type="text"
          className={styles.title}
          value={Image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="URL da imagem"
        />
        <input
          type="text"
          className={styles.title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nome da Terapia"
        />
        <input
          type="text"
          className={styles.title}
          value={duracao}
          onChange={(e) => setDuracao(e.target.value)}
          placeholder="(1hr, 25min, 1hr20min)"
        />
        { terapiaToEdition ? <h1>
          Preço: {terapiaToEdition.price}
        </h1>
          :
          <input
            type="number"
            className={styles.title}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Preço"
          />
        }        <div className={styles.editor}>
          <DynamicEditor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
            }}
          />
        </div>
        <Button disabled={!disabledOrNot} onClick={saveTheText} >
          SAVE THE TEXT
        </Button>
      </div>
    );
  } else {
    return ( 
      <div className='w-100 h-100 mt-5 d-flex flex-column align-items-center'>
        <h1 className='mt-5'>
      ACESSO
        </h1>
        <h1 className='mt-5'>
      NÃO
        </h1>
        <h1 className='mt-5'>
      AUTORIZADO
        </h1>
      </div>
    );
  }
};

export default terapiasEditator;
