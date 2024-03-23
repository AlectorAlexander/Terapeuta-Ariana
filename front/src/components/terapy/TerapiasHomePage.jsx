import styles from "@/styles/terapy/TerapiasHome.module.css";
import useSWR from "swr";
import axios from 'axios';
import Cards from "./CardsTerapias";
import Loading from "../Loading";
import Slider from "react-slick";
import Link from "next/link";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function TerapiasHome() {
  const { data, error } = useSWR('/api/products', fetcher);

  const slidesToShow = data && data.length < 3 ? data.length : 3;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
  };

  return (
    <div className={styles.theRealBiggestContainer}>
      <div className={styles.biggestContainer}>
        <div className={styles.letterContainer} style={{fontWeight: '900'}}>
          <h1 style={{}}>Agende sua consulta ou terapia</h1> 
          <p style={{fontSize: '18px', }}>Escolha a melhor data e horário para seu atendimento e pague online via cartão de crédito, transferência bancária ou PIX.</p>
        </div>
        <div className={`${styles.terapiasContainer}`}>
          {error ? (
            <h1>Failed to load</h1>
          ) : (
            data && data.length > 1 ? (
              <Slider className={styles.carousel} {...settings} >
                { data.map(
                  (item, index) => <Cards key={index} item={item} />
                )}
              </Slider>
            ) : (
              <Loading />
            )
          )
          }
        </div>
        <Link className={styles.a} href="/terapias" passHref>
          <h3>Ver todas terapias</h3>
        </Link>
      </div>
    </div>
  );
}

export default TerapiasHome;
