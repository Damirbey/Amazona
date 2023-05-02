import { Link, useLocation } from 'react-router-dom';
function SignInScreen() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  return (
    <div className="signIn">
      <h1 className="heading-1">Please Sign In</h1>
      <form className="form">
        <label className="form__label" for="email">
          Email
        </label>
        <input type="email" name="email" id="email" className="form__input" />
        <label className="form__label" for="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="form__input"
        />
        <button className="btn">Sign In</button>
        <p className="form__text">
          New customer?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </p>
      </form>
    </div>
  );
}
export default SignInScreen;
