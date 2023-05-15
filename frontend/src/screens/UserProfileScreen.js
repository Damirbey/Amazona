import React, { useState, useReducer, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'REQUEST_UPDATE':
      return { ...state, loadingUpdate: true };
    case 'REQUEST_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'REQUEST_FAIL':
      return { ...state, loadingUpdate: false, error: action.payload };
    default:
      return state;
  }
};

function UserProfileScreen() {
  //DECLARING REDUCER
  const [{ loadingUpdate, error }, dispatch] = useReducer(reducer, {
    loadingUpdate: true,
    error: '',
  });
  //RETREIVING GLOBAL STATES
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  //DECLARING LOCAL STATES
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  //HANDLING THE SUBMIT REQUEST
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'REQUEST_UPDATE' });
      const { data } = await axios.put(
        '/api/users/userProfile',
        { name, email, password },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      dispatch({ type: 'UPDATE_SUCCESS' });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'REQUEST_FAIL', payload: error });
    }
  };
  return (
    <div>
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className="heading-1">User Profile</h1>

      <div className="signIn">
        <form className="form" onSubmit={onSubmitHandler} method="POST">
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
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form__input"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="form__label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="form__input"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="btn" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfileScreen;
