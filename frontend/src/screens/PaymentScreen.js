import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../components/CheckoutSteps';
export default function PaymentScreen() {
  const navigate = useNavigate();
  //RETRIEVING GLOBAL STATES
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { paymentMethod, shippingAddress },
  } = state;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);
  //DECLARING LOCAL STATES
  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || 'PayPal'
  );
  //SUBMITTING THE PAYMENT METHOD CHOICE
  const onSubmitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethodName));
    navigate('/placeOrder');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className="signIn">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="heading-1">Payment Method</h1>
        <form
          className="form__payment"
          onSubmit={onSubmitHandler}
          method="POST"
        >
          <input
            type="radio"
            id="paypal"
            label="PayPal"
            value="PayPal"
            checked={paymentMethodName === 'PayPal'}
            onChange={(e) => setPaymentMethodName(e.target.value)}
          />{' '}
          <span>PayPal</span>
          <br />
          <br />
          <input
            type="radio"
            id="stripe"
            value="Stripe"
            checked={paymentMethodName === 'Stripe'}
            onChange={(e) => setPaymentMethodName(e.target.value)}
          />
          <span> Stripe</span>
          <br />
          <br />
          <button className="btn" type="submit">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
