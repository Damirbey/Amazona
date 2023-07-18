import React, { useContext, useReducer, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import axios from 'axios';
import { getError } from '../utils';

//MANAGING LOCAL STATES USING REDUCER
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loadingUsers: true };
    case 'FETCH_SUCCESS':
      return { ...state, loadingUsers: false, users: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loadingUsers: false };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, deleteSuccess: false };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, deleteSuccess: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, deleteSuccess: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, deleteSuccess: false };
    default:
      return state;
  }
};

function AdminUsersListScreen() {
  const navigate = useNavigate();
  //RETREIVING GLOBAL STATES FROM THE STORE
  const { state } = useContext(Store);
  const { userInfo } = state;

  //LOCAL STATES DECLARATION USING REDUCER
  const [{ loadingUsers, users, deleteSuccess, loadingDelete }, dispatch] =
    useReducer(reducer, {
      loadingUsers: true,
      users: [],
    });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/users/`,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL' });
      }
    };
    if (deleteSuccess) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchUsers();
    }
  }, [userInfo, deleteSuccess]);

  //DELETING USER
  const onDeleteHandler = async (user) => {
    if (window.confirm('Are you sure you want to delete user?')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/users/${user._id}`,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        toast.success('User Deleted Successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (err) {
        dispatch({ type: 'DELETE_FAIL' });
        toast.error(getError(err));
      }
    }
  };
  return (
    <div>
      <Helmet>
        <title>Users List</title>
      </Helmet>
      <h1>Users List</h1>
      {loadingUsers ? (
        <Spinner />
      ) : (
        <table className="table">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Is Admin</th>
            <th>Actions</th>
          </tr>
          {users.map((user, i) => (
            <tr key={i}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? 'YES' : 'NO'}</td>
              <td>
                <button
                  className="btn_gray"
                  onClick={() => navigate(`/user/${user._id}`)}
                >
                  Edit
                </button>
                &nbsp;
                {!loadingDelete && (
                  <button
                    className="btn_gray"
                    onClick={() => onDeleteHandler(user)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}

export default AdminUsersListScreen;
