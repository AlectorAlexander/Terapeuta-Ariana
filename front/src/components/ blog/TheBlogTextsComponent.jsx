import React, { useContext, useEffect, useState } from 'react';
import ArianaContext from "@/context/ArianaContext";
import CardsTextBlogs from './CardsTextBlogs';
import convertFromRawToHtmlContent from '@/services/convertFroRawToHtmlContent';

const TheBlogTextsComponet = () => {
  const { requestPosts } = useContext(ArianaContext);
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestPosts();
        const textsFormatted = response.map(post => {
          return convertFromRawToHtmlContent(post);
        });
        setTexts(textsFormatted);
      } catch (error) {
        console.error("Ocorreu um erro ao buscar os posts:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className='d-flex justify-content-center flex-column'>
      <div className='d-flex justify-content-center  flex-wrap'>
        {texts.map((text, index) => (
          <div key={index}>
            <CardsTextBlogs text={text} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheBlogTextsComponet;
