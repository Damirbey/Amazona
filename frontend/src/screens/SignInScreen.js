import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';
import { getError } from '../utils.js';
import { toast } from 'react-toastify';
import { Store } from '../Store.js';

function SignInScreen() {
  const navigate = useNavigate();
  //EXTRACTING GLOBAL STATES
  const { state, dispatch: ctxDispatch } = useContext(Store);
  //RETREIVING THE REDIRECT QUERY STRING
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  //DECLARING STATES
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //FUNCTION IS CALLED WHEN USER SUBMITS THE FORM
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log('Email is ', email);
      console.log('Password is ', password);
      const { data } = await axios.post('/api/users/signIn', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect);
    } catch (err) {
      toast(getError(err));
    }
  };

  return (
    <div className="signIn">
      <h1 className="heading-1">Please Sign In</h1>
      <form className="form" onSubmit={onSubmitHandler} method="POST">
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
        <button className="btn" type="submit">
          Sign In
        </button>
        <p className="form__text">
          New customer?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </p>
      </form>
    </div>
  );
}
export default SignInScreen;
