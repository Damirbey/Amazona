import { useContext, useEffect, useReducer } from 'react';
import { Store } from '../Store';
import { getError } from '../utils';
import axios from 'axios';
//MANAGING LOCAL STATES
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function AdminDashboardScreen() {
  //RETRIEVING GLOBAL USERINFO STATE FROM THE STORE
  const { state } = useContext(Store);
  const { userInfo } = state;
  //FETCHING DATA FROM THE BACKEND
  useEffect(() => {
    const fetchData = async () => {
      console.log('FETCHING DATA');
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/orders/summary`,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);
  //DECLARING LOCAL STATES
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  console.log('YES', summary);
  return <h1>Dashboard</h1>;
}

export default AdminDashboardScreen;
