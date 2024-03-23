import { useState } from 'react';
import styles from "@/styles/blog/PostsBlogHome.module.css";
import useSWR from "swr";
import axios from 'axios';
import Loading from "../Loading";
import CardsTextBlogs from "./CardsTextBlogs";
import { useEffect } from "react";
import convertFromRawToHtmlContent from "@/services/convertFroRawToHtmlContent";
import Link from 'next/link';

const fetcher = (url) => axios.get(url).then((res) => res.data);

function PostsBlogHome() {
  const { data, error } = useSWR('/api/blog/getRecentPosts', fetcher);
  const [texts, setTexts] = useState([]);


  useEffect(() => {
    if (data) {
      try {
        const textsFormatted = data.map(post => {
          return convertFromRawToHtmlContent(post);
        });
        setTexts(textsFormatted);
      } catch (error) {
        console.error("Ocorreu um erro ao buscar os posts:", error);
      }
    }
  }, [data]);
  

  return (
    <div className={`mt-5 ${styles.biggestContainer}`}>
      <div className={styles.letterContainer} style={{fontWeight: '900'}}>
        <h1 style={{}}>Artigos recentes:</h1> 
      </div>
      <div className={`mt-5 ${styles.blogsContainer}`}>
        {error ? (
          <h1>Failed to load</h1>
        ) : (
          data && data.length > 1 ? (
            <div className={styles.cards}>
              { texts.map(
                (item, index) => <CardsTextBlogs key={index} text={item} />
              )}
            </div>
          ) : (
            <Loading />
          )
        )
        }
      </div>
      <Link className={styles.a} href="/blog" passHref>
        <h3>Ver todos os textos</h3>
      </Link>
    </div>
  );
}

export default PostsBlogHome;
