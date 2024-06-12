/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Carousel } from "react-bootstrap";
import styles from "@/styles/comments/comments.module.css";
import ArianaContext from "@/context/ArianaContext";
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EditTestimonials from "./editTestimonials";
import useAuthentication from "@/hooks/useAuthentication";


export default function Testimonials() {
  const { isAdmin } = useContext(ArianaContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [show, setOnhide] = useState(false);
  const [nomeProp, setNomeProp] = useState('');
  const [somethingToChangeThePageRender, setsomethingToChangeThePageRender] = useState(0);
  const [textoProp, setTextoProp] = useState('');
  const [isToEdition, setIsToEdition] = useState({bool: false, index: null});
  useAuthentication();

  const onEdit = (nome, texto, index) => {
    setNomeProp(nome);
    setTextoProp(texto);
    setIsToEdition({bool: !isNaN(index) ? true : false , index});
    setOnhide(!show);
  };

  useEffect(() => {
    setsomethingToChangeThePageRender(somethingToChangeThePageRender + 1);
  }, [show]);

  const onHide = () => {
    setOnhide(false);
  };

  const removeTestimonial = async (index) => {
    await axios.delete(`/api/comments/delete/${index}`);
    axios.get('/api/comments/readTestimonials')
      .then(response => {
        setTestimonials(response.data);
      })
      .catch(error => {
        console.error('Error fetching testimonials:', error);
      });
    
  };

  const carouseldLogic = () => {
    if (currentIndex === testimonials.length - 1) {
      return setCurrentIndex(0);
    }
    return setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    if (testimonials.length <= 1) {
      return;
    }
    const intervalId = setInterval(carouseldLogic, 6000);
    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, testimonials]
  );


  useEffect(() => {
    axios.get('/api/comments/readTestimonials')
      .then(response => {
        setTestimonials(response.data);
      })
      .catch(error => {
        console.error('Error fetching testimonials:', error);
      });
  }, [somethingToChangeThePageRender]);
  

  return (
    <div className={styles.comments}>
      <Carousel
        bg="dark"
        activeIndex={currentIndex}
        controls={false}
        onSelect={(index) => setCurrentIndex(index)}
        className={styles.carousel}
        fade={false }
      >

        {testimonials.map((comment, index) => (
          <Carousel.Item key={index}>
            <div className={styles.testimonial}>
              <h1>"{comment.testimonial}"</h1>
              <p>-{comment.name}</p>
            </div>
          </Carousel.Item>
        ))}

      </Carousel>
      {isAdmin && (
        <div className={styles.add}>
          <PlusOutlined onClick={() => onEdit("", "")}  className={styles.icon} />
          <EditOutlined  onClick={() => onEdit(testimonials[currentIndex].name, testimonials[currentIndex].testimonial, currentIndex)} className={` mx-1 ${styles.icon}`} />
          <DeleteOutlined  onClick={() => removeTestimonial( currentIndex )} className={` mx-1 ${styles.icon}`} />
        </div>
      )}
      <EditTestimonials show={show} onHide={onHide} nomeProp={nomeProp} textoProp={textoProp} isToEdition={isToEdition} setIsToEdition={setIsToEdition} />
    </div>
  );

}