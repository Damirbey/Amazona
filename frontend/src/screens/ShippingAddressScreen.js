import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';

function ShippingAddressScreen() {
  const navigate = useNavigate();
  //RETRIEVING GLOBAL STATES FROM THE STORE USING useContext Hook
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  //DECLARING LOCAL STATES USING useState Hook
  const [name, setName] = useState(shippingAddress.name || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  //CHECKING IF USER IS SIGNED IN TO BE ON THIS PAGE
  useEffect(() => {
    if (!userInfo) {
      navigate('/signIn?redirect=/shipping');
    }
  }, [userInfo, navigate]);

  //SUBMITTING SHIPPING INFORMATION
  const onSubmitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        name,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        name,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate('/payment');
  };

  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2 />
      <div className="signIn">
        <h1 className="heading-1">Shipping Address</h1>
        <form className="form" onSubmit={onSubmitHandler} method="POST">
          <label className="form__label" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form__input"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
            value={city}
            onChange={(e) => setCity(e.target.value)}
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
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
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
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <button className="btn" type="submit">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default ShippingAddressScreen;
