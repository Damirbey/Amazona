import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Store } from '../Store';
import { getError } from '../utils';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
//DECLARED REDUCER TO MANAGE COMPLEX STATES
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false };
    default:
      return state;
  }
}

function OrderScreen() {
  //RETRIEVING GLOBAL STATES
  const { state } = useContext(Store);
  const { userInfo } = state;

  //GETTING ORDER ID FROM THE URL
  const params = useParams();
  const { id: orderId } = params;

  //MANAGING STATES BY THE REDUCER HOOKs
  const [{ loading, error, order, successPay, loadingPay }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
      order: {},
      successPay: false,
      loadingPay: false,
    });
  //PAYPAL FUNCTIONS
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        toast.success('Order is paid');
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        toast.error(getError(err));
      }
    });
  };
  const onError = (err) => {
    toast.error(getError(err));
  };

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  //CHECKING IF USER IS AUTHORIZED TO BE ON THIS PAGE
  const navigate = useNavigate();
  useEffect(() => {
    console.log('CALLING');
    const fetchOrder = async () => {
      try {
        console.log('CALLING 1');
        dispatch({ type: 'FETCH_REQUEST' });
        console.log('CALLING 2');
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        console.log('CALLING 3');
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    if (!userInfo) {
      navigate('/signIn');
    }
    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get('/api/keys/paypal', {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    }
  }, [order, userInfo, orderId, navigate, paypalDispatch, successPay]);

  return (
    <div>
      <Helmet>
        <title>Order Details</title>
      </Helmet>

      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="alertMessage">{error}</div>
      ) : (
        <div className="order">
          <div className="order__details">
            <div className="order__details__shipping">
              <h3 className="heading-3">Order {orderId}</h3>
              <p>
                <span>Name:</span> {order.shippingAddress.name}
              </p>
              <p>
                <span>Address: </span>
                {order.shippingAddress.address}
              </p>

              {order.isDelivered ? (
                <div className="successMessage">Delivered</div>
              ) : (
                <div className="alertMessage">Not Delivered</div>
              )}
            </div>
            <div className="order__details__payment">
              <h3 className="heading-3">Payment</h3>
              <p>
                <span>Method:</span> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <div className="successMessage">
                  {'Order is Paid at ' + order.paidAt}
                </div>
              ) : (
                <div className="alertMessage">{'Not Paid'}</div>
              )}
            </div>
            <div className="order__details__items">
              <h3 className="heading-3">Items</h3>

              {order.orderItems.map((product) => (
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
            </div>
          </div>

          <div className="order__summary">
            <h3 className="heading-3">Order Summary</h3>
            <div className="order__price">
              <div>
                <p>Items</p>
                <span>${order.itemsPrice.toFixed(2)}</span>
              </div>
              <div>
                <p>Shipping</p>
                <span>${order.shippingPrice.toFixed(2)}</span>
              </div>
              <div>
                <p>Tax</p>
                <span>${order.taxPrice.toFixed(2)}</span>
              </div>
              <div>
                <p style={{ fontWeight: 'bold' }}>Order Total</p>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {!order.isPaid && (
              <div>
                <br />
                {isPending ? (
                  <Spinner />
                ) : (
                  <div>
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    ></PayPalButtons>
                  </div>
                )}
                {loadingPay && <Spinner />}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderScreen;
