import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "animate.css";
import ArianaProvider from "@/context/ArianaProvider";
import { CartProvider } from "use-shopping-cart";
import { useContext, useEffect } from "react";
import ArianaContext from "@/context/ArianaContext";
import 'antd/dist/reset.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from '@/styles/MyApp.module.css';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


function MyApp({ Component, pageProps }) {
  const { token, setToken, setNotifications } = useContext(ArianaContext);

  useEffect(() => {
    const tkn = localStorage.getItem('authToken');
    setToken(tkn);
  }, []);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = function(event) {
      console.log('Conexão WebSocket aberta', event);
      if (token) {
        socket.send(JSON.stringify(token));
      }
    };

    // Evento chamado quando uma mensagem é recebida do servidor
    socket.onmessage = function(event) {
      const newNotification = JSON.parse(event.data);
      console.log('Mensagem recebida', newNotification);
      setNotifications(previousNotifications => [
        ...previousNotifications,
        newNotification
      ]);
    };
    

    socket.onerror = function(error) {
      console.error('Erro no WebSocket', error);
    };

    return () => {
      socket.close();
    };
  }, [token]);

  return (
    <div className={styles.myApp} id="paper">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}


export default function App({ Component, pageProps }) {

  return (
    <ArianaProvider>
      <CartProvider
        mode="payment"
        stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
        successUrl="stripe.com"
        cancelUrl="twitter.com/dayhaysoos"
        currency="BRL"
      >
        <MyApp Component={Component} pageProps={pageProps} />
      </CartProvider>
    </ArianaProvider>
  );
}
