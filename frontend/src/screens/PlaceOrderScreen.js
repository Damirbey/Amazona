import React, { useContext } from 'react';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';

function PlaceOrderScreen() {
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <h1>PLACE ORDER SCREEN</h1>
    </div>
  );
}

export default PlaceOrderScreen;
