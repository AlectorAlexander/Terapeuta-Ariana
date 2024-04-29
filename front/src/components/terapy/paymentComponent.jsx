import { formatTheApiProductsToCompare, formatTheStripeProductsToCompare } from '@/services/compareProducts';
import { useShoppingCart } from 'use-shopping-cart';
import stripe from '@/services/stripe';
import { useEffect, useState } from 'react';
import { CheckoutForm } from './CheckoutForm';
import axios from 'axios';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Loading from '../Loading';
import useAuthentication from '@/hooks/useAuthentication';
const validateCartItems = require('use-shopping-cart/utilities').validateCartItems;

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PaymenteComponente = (product) => {
  const { clearCart, addItem, cartDetails } = useShoppingCart();
  const [stripeProductsList, setStripeProductsList] = useState([]);
  const [productThatIWannaSell, setTheProductIsAvailable] = useState(false);
  const [validatedProducs, setValidateProducs] = useState([]);
  const [clientSecret, setClientSecret] = useState('');


  useAuthentication();

  useEffect(() => {
    if (product && product.product) {
      const formattedAPIProducts = formatTheApiProductsToCompare([product.product])[0];
      addItem(formattedAPIProducts)
        .then(() => {
          // Confirma que o produto foi adicionado antes de prosseguir
          // Aqui, você validaria os itens no carrinho e criaria a intenção de pagamento
          // Se essa validação for bem-sucedida, você pode proceder para configurar a intenção de pagamento
          setTheProductIsAvailable(true); // Esta linha é um placeholder. Substitua pela sua lógica.
        })
        .catch(error => {
          console.error("Erro ao adicionar produto ao carrinho:", error);
        });
    }
  }, [product]);
  

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    if (stripeProductsList.length === 0) {
      stripe.products.list({
        expand: ['data.default_price'],
        active: true,
      })
        .then(result => {
          const formattedStripes = formatTheStripeProductsToCompare(result.data);
          setStripeProductsList(formattedStripes);
        })
        .catch(error => {
          console.error("Erro ao listar produtos Stripe:", error);
        });
    } else {
      clearCart()
        .then(() => {
          const formattedAPIProducts = formatTheApiProductsToCompare([product.product])[0];
          return addItem(formattedAPIProducts);
        })
        .then(() => {
          return validateCartItems(stripeProductsList, cartDetails);
        })
        .then(result => {
          setTheProductIsAvailable(true);
          setValidateProducs(result);
        })
        .catch(error => {
          console.error("Erro ao atualizar carrinho ou validar itens:", error);
        });
    }
  }, [stripeProductsList]);
  

  useEffect(() => {
    if (productThatIWannaSell) {
      const { unit_amount } = validatedProducs[0].price_data;
      axios.post('/api/create-payment-intent', {amount: unit_amount})
        .then(({ data }) => {
          setClientSecret(data.clientSecret);
        })
        .catch(error => {
          console.error("Erro ao criar sessão de pagamento:", error);
        });
    } else {
      console.log(`We have a problem here, the product that I want to sell is: ${validatedProducs} and the length is: ${validatedProducs.length}`);
    }
  }, [validatedProducs]);

  const appearance = {
    theme: 'night',
    variables: {
      fontFamily: 'Sohne, system-ui, sans-serif',
      fontWeightNormal: '500',
      borderRadius: '8px',
      colorBackground: '#0A2540',
      colorPrimary: '#EFC078',
      accessibleColorOnColorPrimary: '#1A1B25',
      colorText: 'black',
      colorTextSecondary: 'white',
      colorTextPlaceholder: '#96728b',
      tabIconColor: 'black',
      logoColor: 'dark'
    },
    rules: {
      '.Input, .Block': {
        backgroundColor: 'transparent',
        border: '1.5px solid var(--colorPrimary)'
      }
    }
  };
  
  const options = {
    clientSecret,
    appearance,
  };


  return (
    <div>
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>) : (
        <Loading />
      )
      }
    </div>
  );

};

export default PaymenteComponente;