import React, { useState } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { Helmet } from 'react-helmet-async';

function ShippingScreen() {
  //DECLARING LOCAL STATES USING useStateHook
  const [name, setName] = useState('');

  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2 />
      <div className="signIn">
        <h1 className="heading-1">Shipping Address</h1>
        <form className="form" onSubmit={'onSubmitHandler'} method="POST">
          <label className="form__label" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form__input"
            required
          />

          <label className="form__label" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            className="form__input"
            required
          />

          <label className="form__label" htmlFor="city">
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            className="form__input"
            required
          />

          <label className="form__label" htmlFor="postalCode">
            Postal Code
          </label>
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            className="form__input"
            required
          />
          <label className="form__label" htmlFor="country">
            Country
          </label>
          <input
            type="text"
            name="country"
            id="country"
            className="form__input"
            required
          />
          <button className="btn" type="submit">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default ShippingScreen;
