import ArianaContext from "@/context/ArianaContext";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useState } from "react";
import { CheckCircleOutlined } from '@ant-design/icons';
import emailjs from '@emailjs/browser';
import { Button } from "react-bootstrap";
import styles from '@/styles/terapy/CheckoutForm.module.css';
import { createRefund, getChargeIdFromPaymentIntent } from "@/pages/api/booking/delete";

export function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const { finalDateToPost, sessionName, setToken, phoneNumber } = useContext(ArianaContext);
  const [message, setMessage] = useState(null);
  const [successCase, setSuccessCase] = useState(false);

  const sendEmailToAriana =  (message) => {
    const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;
    const EMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY;  
    const emailData = {
      to_name: "Ariana",
      from_name: "Ariana Terapias",
      message,
      reply_to: "nao_responda@noresponse.com",
      subject: "Nova sessão agendada"
    };
    emailjs.send(SERVICE_ID, EMPLATE_ID, emailData, PUBLIC_KEY).then((response) => {
      console.log('Email enviado com sucesso!', response.status, response.text);
    }, (error) => {
      console.error('Erro ao enviar email:', error);
    });
  };


  const  sendPaymentRequest = async (data) => {
    try {
      const token = localStorage.getItem('authToken');
      setToken(token); 

      const response = await axios.post('/api/booking', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    }
  };

  const updatePaymentIntent = async (paymentId, paymentIntentId) => {
    const token = localStorage.getItem('authToken');
    setToken(token); 

    const data = { paymentIntentId };

    await axios.post('/api/payment/update', {id: paymentId, data}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const initiateRefund = async (paymentIntentId) => {
    try {
      const chargeId = await getChargeIdFromPaymentIntent(paymentIntentId);
      if (!chargeId) {throw new Error('No charge ID found for PaymentIntent');}
  
      await createRefund(chargeId);
      console.log('Refund created successfully');
    } catch (error) {
      console.error('Error initiating refund:', error);
      throw error; // Propagar o erro para ser tratado na camada superior
    }
  };
  

  const handlePaymentIntentStatus = async (paymentIntent) => {
    let data;
    const price = (paymentIntent.amount / 100) || 0;
    data = { scheduleData: { ...finalDateToPost, status: 'agendado' }, paymentData: { price, status: 'pago' }, sessionName, phoneNumber };
  
    try {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage("Aguarde mais um pouco...");
          try {
            const { sessionData, paymentData } = await sendPaymentRequest(data);
            const emailMessage = sessionData.date;
            await sendEmailToAriana(emailMessage);
            console.log({ paymentData });
            await updatePaymentIntent(paymentData._id, paymentIntent.id);
            setSuccessCase(true);
            setMessage("Sessão agendada!");
          } catch (innerError) {
            console.error('Erro durante as operações pós-pagamento:', innerError);
            setMessage("Erro durante o processo. Iniciando reembolso...");
            await initiateRefund(paymentIntent.id);
          }
          break;
        case 'processing':
          setMessage("Your payment is processing.");
          await sendPaymentRequest(data);
          break;
        case 'requires_payment_method':
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    } catch (e) {
      console.error(e);
      setMessage("An error occurred, operation cancelled.");
    }
  };

  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Handle the error: Stripe.js has not yet loaded
      console.log('Stripe.js has not loaded yet.');
      return;
    }

    const paymentElement = elements.getElement(PaymentElement);

    if (!paymentElement) {
      // Handle the error: PaymentElement has not been initialized yet.
      console.log('PaymentElement has not been initialized yet.');
      return;
    }

    // Ensure the client secret is present
    if (!clientSecret) {
      console.log('No client secret found.');
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000",
      },
      redirect: 'if_required',
    });

    // Handle the response from the Stripe API
    if (error) {
      // Handle errors here, such as by setting the message state
      console.error(error);
      setMessage(error.message);
    } else if (paymentIntent) {
      await handlePaymentIntentStatus(paymentIntent);
    }
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div>
      {successCase ? (
        <div className={`animate__animated animate__fadeInDown ${styles.successIcon}`}> 
          <CheckCircleOutlined className="animate__animated animate__fadeInUp" /> 
          {message && <div className="mt-1" id="payment-message">{message}</div>}

        </div>
      ) : 
        ( <form onSubmit={handleSubmit} id="payment-form" className="d-flex flex-column justify-content-center align-items-center">
          <PaymentElement id="payment-element" options={paymentElementOptions} />
          <Button type="submit" className="mt-2" variant="warning" disabled={!stripe || !elements} id="submit">
            <span id="button-text">
              {!stripe || !elements ? <div className="spinner" id="spinner"></div> : "Pagar"}
            </span>
          </Button>
          {message && <div id="payment-message">{message}</div>}
        </form> ) }
    </div>
  );
}
