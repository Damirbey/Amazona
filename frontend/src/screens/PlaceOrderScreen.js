import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Spinner from '../components/Spinner';

//DECLARED REDUCER TO MANAGE COMPLEX STATES
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

function PlaceOrderScreen() {
  //MANAGING STATES BY THE REDUCER HOOKs
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  //RETRIEVING GLOBAL STATES
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart,
    cart: { paymentMethod, shippingAddress },
  } = state;

  //CHECKING IF USER IS AUTHORIZED TO BE ON THIS PAGE
  const navigate = useNavigate();
  useEffect(() => {
    if (!paymentMethod) {
      navigate('/payment');
    }
  }, [paymentMethod, navigate]);

  //CALCULATING PRICES INSIDE THE CART
  cart.itemPrices = cart.cartItems.reduce(
    (a, c) => a + c.price * c.quantity,
    0
  );
  cart.shippingPrice = cart.itemPrices > 100 ? 0 : 10;
  cart.taxPrice = 0.15 * cart.itemPrices;
  cart.totalPrice = cart.shippingPrice + cart.taxPrice + cart.itemPrices;
  //WHEN PLACE ORDER BUTTON IS CLICKED
  const placeOrderHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'FETCH_REQUEST' });
      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemPrices,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'CART_CLEAR' });
      localStorage.removeItem('cartItems');
      dispatch({ type: 'FETCH_SUCCESS' });
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: 'FETCH_FAIL' });
      toast.error(getError(err));
    }
  };

  return (
    <div>
      <Helmet>
        <title>Place Order</title>
      </Helmet>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="order">
        <div className="order__details">
          <div className="order__details__shipping">
            <h3 className="heading-3">Shipping</h3>
            <p>
              <span>Name:</span> {shippingAddress.name}
            </p>
            <p>
              <span>Address: </span>
              {shippingAddress.address}
            </p>

            <Link to="/shipping">Edit</Link>
          </div>
          <div className="order__details__payment">
            <h3 className="heading-3">Payment</h3>
            <p>
              <span>Method:</span> {paymentMethod}
            </p>
            <Link to="/payment">Edit</Link>
          </div>
          <div className="order__details__items">
            <h3 className="heading-3">Items</h3>

            {state.cart.cartItems.map((product) => (
              <div
                className="cartItem"
                style={{ border: 'none' }}
                key={product._id}
              >
                <img
                  src={product.image}
                  alt={product.slug}
                  className="cartItem__img"
                />
                <Link to={`/product/${product.slug}`}>
                  <h3 className="heading-3 product__name">{product.name}</h3>
                </Link>

                <p className="cartItem__price">${product.price}</p>
              </div>
            ))}
            <br />
            <Link to="/cart">Edit</Link>
          </div>
        </div>

        <div className="order__summary">
          <h3 className="heading-3">Order Summary</h3>
          <div className="order__price">
            <div>
              <p>Items</p>
              <span>${cart.itemPrices.toFixed(2)}</span>
            </div>
            <div>
              <p>Shipping</p>
              <span>${cart.shippingPrice.toFixed(2)}</span>
            </div>
            <div>
              <p>Tax</p>
              <span>${cart.taxPrice.toFixed(2)}</span>
            </div>
            <div>
              <p style={{ fontWeight: 'bold' }}>Order Total</p>
              <span>${cart.totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button className="btn" onClick={placeOrderHandler}>
            Place Order
          </button>
          {loading && <Spinner />}
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
