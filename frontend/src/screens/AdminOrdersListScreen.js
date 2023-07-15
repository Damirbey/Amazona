import React, { useContext, useReducer, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { Store } from '../Store';
import axios from 'axios';
import { toast } from 'react-toastify';

//MANAGING STATES ON THE PAGE
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loadingOrders: true };
    case 'FETCH_SUCCESS':
      return { ...state, loadingOrders: false, orders: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loadingOrders: false };
    default:
      return state;
  }
};

function AdminOrdersListScreen() {
  const navigate = useNavigate();
  // RETREIVING GLOBAL STATES
  const { state } = useContext(Store);
  const { userInfo } = state;
  //USING REDUCER TO MANAGE STATES
  const [{ loadingOrders, orders }, dispatch] = useReducer(reducer, {
    loadingOrders: true,
    orders: [],
  });
  //FETCHING ORDERS FROM THE BACKEND
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/orders/admin/allOrders`,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        console.log(data);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL' });
      }
    };
    fetchOrders();
  }, [userInfo]);
  return (
    <div>
      <Helmet>
        <title>Orders List</title>
      </Helmet>
      <h1>Orders List</h1>
      {loadingOrders ? (
        <Spinner />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Actions</th>
            </tr>
          </thead>
          {orders.map((order, i) => (
            <tr key={i}>
              <td>{order._id}</td>
              <td>{order.user ? order.user.name : 'DELETED USER'}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>{order.totalPrice.toFixed(2)}</td>
              <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
              <td>
                {order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}
              </td>
              <td>
                <button
                  className="btn_gray"
                  onClick={() => navigate(`/order/${order._id}`)}
                >
                  Details
                </button>
                &nbsp;
                <button className="btn_gray">Delete</button>
              </td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}

export default AdminOrdersListScreen;
