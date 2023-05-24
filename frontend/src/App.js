import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { Store } from './Store';
import { React, useContext } from 'react';
import CartScreen from './screens/CartScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import UserProfileScreen from './screens/UserProfileScreen';

function App() {
  //EXTRACTING GLOBAL STATES FROM THE CONTEXT STORE
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  // FUNCTION USED TO HANDLE THE SIGN OUT PROCESS
  const onSignOutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  // FUNCTION USED TO EXPAND THE NAVBAR
  const expandNavbar = () => {
    toast('YES CLICKED');
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
          <div class="sidebar"></div>

          <div class="topnav" id="myTopnav">
            <Link to="#home" class="active">
              Amazona
            </Link>
            <Link to="#news">News</Link>
            <Link href="#contact">Contact</Link>
            <Link href="#about">About</Link>
            <Link class="icon" onClick={expandNavbar}>
              <i class="fa fa-bars"></i>
            </Link>
          </div>
          {/*<ul className="nav">
            <li className="nav__item">
              <Link to="/" className="header__brandName">
                amazona
              </Link>
            </li>
            <div className="nav__left-section">
              <li className="nav__item">
                <Link to="/cart" className="nav__link">
                  Cart
                  <span className="cart__quantity">
                    {cart.cartItems.length}
                  </span>
                </Link>
              </li>
              <li className="nav__item">
                <div class="dropdown">
                  Dropdown
                  <div class="dropdown-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                  </div>
                </div>
              </li>
              <li className="nav__item">
                {userInfo ? (
                  <div className="userProfile ">
                    <Link to="/" className="nav__link">
                      {userInfo.name}
                    </Link>
                    <div className="userProfile__links">
                      <Link to="/userProfile" className="nav__link">
                        User Profile
                      </Link>
                      <Link to="/orderHistory" className="nav__link">
                        Order History
                      </Link>
                      <Link
                        to="/"
                        className="nav__link"
                        onClick={onSignOutHandler}
                      >
                        Sign Out
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Link to="/signIn" className="nav__link">
                    Sign In
                  </Link>
                )}
              </li>
            </div>
                </ul>*/}
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/signIn" element={<SignInScreen />} />
            <Route path="/signUp" element={<SignUpScreen />} />
            <Route path="/shipping" element={<ShippingAddressScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeOrder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/orderHistory" element={<OrderHistoryScreen />} />
            <Route path="/userProfile" element={<UserProfileScreen />} />
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
