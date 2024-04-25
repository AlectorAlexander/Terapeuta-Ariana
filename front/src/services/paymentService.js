import axios from 'axios';
const api_base = `http://localhost:${process.env.NEXT_PUBLIC_PORT}`;

function startTransaction() {
    const transaction = {
      committed: false,
      rollbackActions: [],
      commit() { this.committed = true; },
      rollback() {
        this.rollbackActions.forEach(action => action());
      },
      addRollbackAction(action) {
        this.rollbackActions.push(action);
      },
    };
    return transaction;
  }
  

  async function addItemToCart(product, transaction) {
    try {
      const response = await axios.post(`${api_base}/cart/add`, product);
      if (!response) throw new Error('Failed to add product to cart');
  
      // Adiciona a ação de rollback para remover item se necessário
      transaction.addRollbackAction(() => axios.post(`${api_base}/cart/remove`, { productId: product.id }));
    } catch (error) {
      console.error('addItemToCart error:', error);
      throw error;
    }
  }
  

  async function createPaymentIntent(amount, transaction) {
    try {
      const response = await axios.post(`api/create-payment-intent`, { amount });
      if (!response) throw new Error('Failed to create payment intent');
      return response.data.paymentIntentId;
    } catch (error) {
      console.error('createPaymentIntent error:', error);
      throw error;
    }
  }
  

  async function confirmPayment(paymentIntentId, transaction) {
    try {
      const response = await axios.post(`${api_base}/payments/confirm`, { paymentIntentId });
      if (!response) throw new Error('Payment confirmation failed');
    } catch (error) {
      console.error('confirmPayment error:', error);
      transaction.addRollbackAction(() => axios.post(`${api_base}/payments/cancel`, { paymentIntentId }));
      throw error;
    }
  }
  

  async function processPayment(product) {
    const transaction = startTransaction();
    try {
      await addItemToCart(product, transaction);
      const paymentIntentId = await createPaymentIntent(product.price, transaction);
      await confirmPayment(paymentIntentId, transaction);
      transaction.commit();
    } catch (error) {
      transaction.rollback();
      console.error('Payment process failed:', error);
      throw new Error('Payment process was rolled back due to an error.');
    }
  }
  
