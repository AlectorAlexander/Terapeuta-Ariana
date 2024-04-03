import React, { useContext, useEffect, useState } from 'react';
import ArianaContext from "@/context/ArianaContext";
import CardsTextBlogs from './CardsTextBlogs';
import convertFromRawToHtmlContent from '@/services/convertFroRawToHtmlContent';
import Loading from '../Loading';

const TheBlogTextsComponet = () => {
  const { requestPosts } = useContext(ArianaContext);
  const [texts, setTexts] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestPosts();
        const textsFormatted = response.map(post => {
          return convertFromRawToHtmlContent(post);
        });
        setTexts(textsFormatted);
      } catch (error) {
        setErrorMsg(error.message);
        console.error("Ocorreu um erro ao buscar os posts:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className='d-flex justify-content-center flex-column'>
      {errorMsg ? ( 
        <h1>{errorMsg}</h1>
      ) : (
        <div className='d-flex justify-content-center flex-wrap'>
          {texts && texts.length > 0 ? (
            texts.map((text, index) => (
              <div key={index}>
                <CardsTextBlogs text={text} />
              </div>
            ))
          ) : (
            <div className='h-100 w-100 my-5 pb-5 d-flex justify-content-center'>
              <Loading />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TheBlogTextsComponet;
