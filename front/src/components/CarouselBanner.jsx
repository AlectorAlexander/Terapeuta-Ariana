import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import styles from '../styles/CarouselBanner.module.css';



function CarouselComponent({images, titleh1, textp}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const backGroundLogic = () => {
    if (currentIndex === images.length - 1) {
      return setCurrentIndex(0);
    }
    return setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    const intervalId = setInterval(backGroundLogic, 6000);
    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]
  );
  
  const renderText = (titleh1, textp) => {
    if (titleh1 && textp) {
      return (
        <div className={styles.textFormatting}>
          <h1>{titleh1}</h1>
          <p>{textp}</p>
        </div>
      );
    }
    return (
      <div className={styles.textFormatting}>
        <h1 className={styles.textFormatting}>{titleh1}</h1>
      </div>
    );
  
  };

  return (
    images && images.length > 0 && (
      <div className={styles.ContainerCarouselBanner} id={styles.ContainerCarouselBannerId}>
        {titleh1 && renderText(titleh1, textp)}
        <Carousel
          bg="dark"
          activeIndex={currentIndex}
          controls={false}
          onSelect={(index) => setCurrentIndex(index)}
          className={styles.carousel}
          fade={true}
        >

          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <Image
                className={styles.carouselImage}  
                width={700}
                height={200}
                layout="responsive"
                src={image} 
                alt="carousel-banner"
              />
            </Carousel.Item>
          ))}

        </Carousel>
      </div>
    )
  );

}

export default CarouselComponent;