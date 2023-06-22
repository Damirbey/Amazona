import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { getError } from '../utils.js';
import { toast } from 'react-toastify';
import { Store } from '../Store.js';
import { Helmet } from 'react-helmet-async';

function SignUpScreen() {
  const navigate = useNavigate();
  //EXTRACTING GLOBAL STATES
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  //RETREIVING THE REDIRECT QUERY STRING
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  //DECLARING STATES
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  //FUNCTION IS CALLED WHEN USER SUBMITS THE FORM
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast('Passwords do not match!');
      return;
    }
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/signUp`, {
        email,
        name,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect);
    } catch (err) {
      toast(getError(err));
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="signIn">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="heading-1">Please Sign Up</h1>
      <form className="form" onSubmit={onSubmitHandler} method="POST">
        <label className="form__label" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="form__input"
          required
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
          Sign Up
        </button>
      </form>
    </div>
  );
}
export default SignUpScreen;
