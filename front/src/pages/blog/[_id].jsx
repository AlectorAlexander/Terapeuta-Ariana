import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import ArianaContext from '@/context/ArianaContext';
import useSWR from "swr";
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { signOut } from '@/services/auth';
import Loading from '@/components/Loading';
import convertFromRawToHtmlContent from '@/services/convertFroRawToHtmlContent';
import styles from '@/styles/blog/TextBlogId.module.css';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { EditorState, convertFromRaw } from 'draft-js';
import useAuthentication from '@/hooks/useAuthentication';


const fetcher = (url) => axios.get(url).then((res) => res.data);

const TextBlog = () => {
  const router = useRouter();
  const { _id } = router.query;
  const { BlogText, isAdmin, setPostToEdition } = useContext(ArianaContext);
  const [item, setItem] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [originalPostFormat, setOriginalPostFormat] = useState();

  useAuthentication();

  const pushToEdition = () => {
    try {
      const rawContent = JSON.parse(originalPostFormat.content);
      const content = convertFromRaw(rawContent);
      const textRaw = EditorState.createWithContent(content);
  
      setPostToEdition({
        text: textRaw,
        title: item.title,
        image: item.image,
        _id: item._id,
      });
  
      router.push('/blog/edit-blog');
  
    } catch (error) {
      console.error('Erro ao analisar o conteúdo para edição:', error);
    }
  };
  
  // src/pages/blog/[_id].js
  const deleteThePost = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`/api/blog/delete/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Se você tem um estado chamado setPostToEdition, você pode querer limpar isso aqui.
      router.push('/blog');
    } catch (error) {
      console.error("Ocorreu um erro ao excluir o post:", error);
    // Aqui você pode definir um estado de erro e mostrar uma mensagem para o usuário
    }
  };


  


  const fetch = shouldFetch ? `/api/blog/${_id}` : null;
  const { data, error } = useSWR(fetch, fetcher);


  useEffect(() => {
    if (BlogText && BlogText._id && BlogText._id === _id) {
      setOriginalPostFormat(BlogText);
      const postFormatted = convertFromRawToHtmlContent(BlogText);
      setItem(postFormatted);
    } else {
      if (_id){
        setShouldFetch(true);
      }
    }
  }, [_id, BlogText]);

  useEffect(() => {
    if (data) {
      setOriginalPostFormat(data);
      const postFormatted = convertFromRawToHtmlContent(data);
      setItem(postFormatted);
    }
  }, [data, shouldFetch]);
  
  

  if (error) {return <h1 className='h-100'>{error.message}</h1>;}

  return (
    <div className={styles.mainContainer}>
      {isAdmin && <div className={styles.adminIcons}>
        <div onClick={pushToEdition} className={`${styles.icon} icon`}>
          <EditOutlined />
        </div>
        <div onClick={deleteThePost} className={`${styles.icon} icon`}>
          <DeleteOutlined />
        </div>
      </div>}
      {item && item.image ? (
        <div className={styles.container}>
          <h1>{item.title}</h1>
          <img src={item.image} alt={item.title} />
          <div dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
  
};

export default TextBlog;
