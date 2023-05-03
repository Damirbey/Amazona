import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { Store } from './Store';
import { React, useContext } from 'react';
import CartScreen from './screens/CartScreen';
import SignInScreen from './screens/SignInScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  //EXTRACTING GLOBAL STATES FROM THE CONTEXT STORE
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  // FUNCTION USED TO HANDLE THE SIGN OUT PROCESS
  const onSignOutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
  };
  return (
    <BrowserRouter>
      <div className="App">
        <header className="header">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <ul className="nav">
            <li className="nav__item">
              <Link to="/" className="header__brandName">
                amazona
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/cart" className="nav__link">
                Cart
                <span className="cart__quantity">{cart.cartItems.length}</span>
              </Link>
            </li>
            {userInfo ? (
              <span>
                <li className="nav__item">
                  <Link to="/" className="nav__link">
                    {userInfo.name}
                  </Link>
                </li>
                <li className="nav__item" onClick={onSignOutHandler}>
                  <Link to="/" className="nav__link">
                    Sign Out
                  </Link>
                </li>
              </span>
            ) : (
              <li className="nav__item">
                <Link to="/signIn" className="nav__link">
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/signIn" element={<SignInScreen />} />
          </Routes>
        </main>
        <footer className="footer">
          <span className="footer__text">All Rights Reserved</span>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
