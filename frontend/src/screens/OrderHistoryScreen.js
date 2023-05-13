import { useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'REQUEST_ORDER':
      return { ...state, loading: true };
    case 'REQUEST_SUCCESS':
      return { ...state, loading: false, orders: action.payload };
    case 'REQUEST_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function OrderHistoryScreen() {
  //RETREIVING GLOBAL STATES
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  //RETRIEVING STATES FROM REDUCER
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    orders: [],
  });

  //useEffect
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'REQUEST_ORDER' });
        const { data } = await axios.get(`/api/orders/mine`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'REQUEST_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'REQUEST_FAIL', payload: err });
      }
    };
    fetchOrders();
  }, [userInfo]);
  console.log(orders);
  return (
    <div>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <h1 className="heading-1">Order History</h1>
      <table className="orderHistory_table">
        <tr>
          <th>ID</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>DELIVERED</th>
          <th>ACTIONS</th>
        </tr>
        {orders.map((order) => {
          return (
            <tr>
              <td>{order._id}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>{order.totalPrice}</td>
              <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'NO'}</td>
              <td>{order.isDelivered ? 'YES' : 'NO'}</td>
              <td>
                <button
                  onClick={() => navigate(`/order/${order._id}`)}
                  className="orderHistory_details_btn"
                >
                  DETAILS
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
export default OrderHistoryScreen;
