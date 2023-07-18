import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { getError } from '../utils';

//MANAGING LOCAL STATES USING REDUCER
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loadingUser: true };
    case 'FETCH_SUCCESS':
      return { ...state, loadingUser: false };
    case 'FETCH_FAIL':
      return { ...state, loadingUser: false };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

function AdminEditUserScreen() {
  const params = useParams();
  const { id: userId } = params;
  const navigate = useNavigate();
  //RETREIVING GLOBAL STATES
  const { state } = useContext(Store);
  const { userInfo } = state;
  //LOCAL STATES
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [{ loadingUser }, dispatch] = useReducer(reducer, {
    loadingUser: true,
  });

  //FETCHING DATA FROM THE BACKEND
  useEffect(() => {
    const fetchUser = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/users/${userId}`,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        console.log('data is', data);
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL' });
      }
    };
    fetchUser();
  }, [userId, userInfo]);

  //UPDATING USER
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      console.log(isAdmin);
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/users/updateUser/${userId}`,
        {
          name,
          email,
          isAdmin,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      toast.success('User Updated successfully!');
      dispatch({ type: 'UPDATE_SUCCESS' });
      navigate('/admin/usersList');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Edit User</title>
      </Helmet>
      {loadingUser ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="heading-1">User Profile</h1>

          <div className="signIn">
            <form className="form" onSubmit={onSubmitHandler} method="PUT">
              <label className="form__label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="email"
                id="name"
                className="form__input"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="form__label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form__input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="form__label" htmlFor="isAdmin">
                Is Admin
              </label>
              <input
                type="checkbox"
                name="isAdmin"
                id="isAdmin"
                className="form__input"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />

              <button className="btn" type="submit">
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminEditUserScreen;
