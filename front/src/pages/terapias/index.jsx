import CarouselComponent from "@/components/CarouselBanner";
import styles from "@/styles/terapy/Terapias.module.css";
import useSWR from "swr";
import axios from 'axios';
import Cards from "../../components/terapy/CardsTerapias";
import Loading from "../../components/Loading";
import { useContext, useEffect } from "react";
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";
import ArianaContext from "@/context/ArianaContext";
import useAuthentication from "@/hooks/useAuthentication";


const fetcher = (url) => axios.get(url).then((res) => res.data);

function Terapias() {
  const { isAdmin } = useContext(ArianaContext);
  const { data, error } = useSWR('/api/products', fetcher);
  const router = useRouter();
  useAuthentication();
 
  const images = [
    '/bannerTerapias1.png', 
    '/bannerTerapias2.png', 
    '/bannerTerapias3.png', 
    '/bannerTerapias4.png'
  ];

  useEffect(() => {
    console.log({terapiasIndexPage30: data});

  }, [data]);

  const moveToEditionPage = () => {
    router.push('/terapias/edit-terapia');
  };  



  const renderToAdmin = () => {
    return (
      <div>
        <PlusOutlined onClick={moveToEditionPage} className={styles.icon} />
      </div>
    );
  };

  return (
    <div>
      <CarouselComponent 
        titleh1="Terapias" 
        textp="Agende sua terapia agora mesmo" 
        images={images} 
      />
      <div className={styles.terapiasContainer}>
        {error ? (
          <h1>Failed to load</h1>
        ) : (
          data && data.length > 0 ? (
            data.map((item, index) => <Cards key={index} item={item} />)
          ) : (
            <Loading />
          )
        )}
      </div>
      {isAdmin ? renderToAdmin() : null}
    </div>
  );
}

export default Terapias;
