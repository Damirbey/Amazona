import { useContext, useEffect, useReducer } from 'react';
import { Store } from '../Store';
import Spinner from '../components/Spinner';
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
  return loading ? (
    <Spinner />
  ) : (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard_stats">
        <div className="dashboard_stats_statistic">
          <p className="text-bold">
            {summary.users && summary.users[0] ? summary.users[0].numUsers : 0}
          </p>
          <p>Users</p>
        </div>
        <div className="dashboard_stats_statistic">
          <p className="text-bold">
            {summary.orders && summary.orders[0]
              ? summary.orders[0].numOrders
              : 0}
          </p>
          <p>Orders</p>
        </div>
        <div className="dashboard_stats_statistic">
          <p className="text-bold">
            $
            {summary.orders && summary.orders[0]
              ? summary.orders[0].totalSales
              : 0}
          </p>
          <p>Total Sales</p>
        </div>
      </div>
      <div className="admin_dashboard_graphs"></div>
    </div>
  );
}

export default AdminDashboardScreen;
