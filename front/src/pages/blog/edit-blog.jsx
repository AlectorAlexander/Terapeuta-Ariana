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

const BlogEditator = () => {
  const { isAdmin, postToEdition, setPostToEdition, setToken } = useContext(ArianaContext);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [title, setTitle] = useState('');
  const [Image, setImage] = useState('');
  const router = useRouter();
  useAuthentication();

  const hasText = (editorState) => {
    const contentState = editorState.getCurrentContent();
    return contentState.hasText();
  };

  useEffect(() => {
    if (postToEdition) {
      setTitle(postToEdition.title);
      setImage(postToEdition.image);
      setEditorState(postToEdition.text);
    }
  }, [postToEdition]);

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
  
      const takeToTheServer = { title, content: rawContentState, image: Image };
      if(postToEdition) {
        await axios.put('/api/blog/update', {...takeToTheServer, _id: postToEdition._id}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPostToEdition(null);
        setTitle('');
        setEditorState(EditorState.createEmpty());
        return router.push(`/blog/${postToEdition._id}`);
      }
      await axios.post('/api/blog/create', takeToTheServer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
  
      setTitle('');
      setEditorState(EditorState.createEmpty());
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
          placeholder="Título"
        />
        <div className={styles.editor}>
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
    return <h1>ACESSO NÃO AUTORIZADO</h1>;
  }
};

export default BlogEditator;
