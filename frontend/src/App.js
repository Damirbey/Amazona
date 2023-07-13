import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { Store } from './Store';
import { React, useContext, useEffect, useState } from 'react';
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
import SearchScreen from './screens/SearchScreen';
import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import AdminProductsScreen from './screens/AdminProductsScreen';
import AdminProductEditScreen from './screens/AdminProductEditScreen';

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
    window.location.href = '/signIn';
  };

  //OPENING SIDENAV
  const openNav = () => {
    document.getElementById('mySidenav').style.width = '12rem';
    document.getElementsByTagName('main')[0].style.marginLeft = '12rem';
    document.getElementsByTagName('header')[0].style.marginLeft = '12rem';
    document.getElementsByTagName('footer')[0].style.marginLeft = '12rem';
  };
  //CLOSING SIDENAV
  const closeNav = () => {
    document.getElementById('mySidenav').style.width = '0';
    document.getElementsByTagName('main')[0].style.marginLeft = '0';
    document.getElementsByTagName('header')[0].style.marginLeft = '0';
    document.getElementsByTagName('footer')[0].style.marginLeft = '0';
  };
  //DECLARING LOCAL STATES
  const [categories, setCategories] = useState([]);
  //FETCHING ALL CATEGORIES FROM THE BACKEND
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products/categories`
        );
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

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
          <div className="sidebar"></div>
          {/**NAVIGATION */}
          <nav className="nav">
            <input type="checkbox" id="nav-check" />
            <div className="nav-header">
              <span
                style={{ fontSize: 30, cursor: 'pointer', color: '#fff' }}
                onClick={openNav}
              >
                &#9776;
              </span>
              <Link className="nav-title" to="/">
                Amazona
              </Link>
            </div>

            <SearchBox />

            <div className="nav-btn">
              <label htmlFor="nav-check">
                <span></span>
                <span></span>
                <span></span>
              </label>
            </div>

            <div className="nav-links">
              <Link to="/cart">
                Cart
                <span className="cart__quantity">{cart.cartItems.length}</span>
              </Link>
              {userInfo ? (
                <span>
                  <div className="dropdown">
                    <Link to="/">
                      {userInfo.name}{' '}
                      <i className="fas fa-solid fa-caret-down"></i>
                    </Link>
                    <div className="dropdown-content">
                      <Link to="/userProfile">User Profile</Link>
                      <Link to="/orderHistory">Order History</Link>
                      <Link to="" onClick={onSignOutHandler}>
                        Sign Out
                      </Link>
                    </div>
                  </div>
                </span>
              ) : (
                <Link to="/signIn">Sign In</Link>
              )}
              {userInfo && userInfo.isAdmin ? (
                <span>
                  <div className="dropdown">
                    <Link to="/">
                      Admin <i className="fas fa-solid fa-caret-down"></i>
                    </Link>
                    <div className="dropdown-content">
                      <Link to="/admin/dashboard">Dashboard</Link>
                      <Link to="/admin/productsList">Products</Link>
                      <Link to="/admin/ordersList">Orders</Link>
                      <Link to="/admin/usersList">Users</Link>
                    </div>
                  </div>
                </span>
              ) : (
                ''
              )}
            </div>
          </nav>
          <div id="mySidenav" className="sidenav">
            <Link
              className="closebtn"
              style={{ cursor: 'pointer' }}
              onClick={closeNav}
            >
              &times;
            </Link>
            <h2 style={{ color: '#fff', paddingLeft: 15, marginTop: -5 }}>
              Categories
            </h2>
            {categories.map((category, i) => {
              return (
                <Link key={i} to={`search?category=${category}`}>
                  {category}
                </Link>
              );
            })}
          </div>
        </header>

        <main className="main">
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
            <Route
              path="/orderHistory"
              element={
                <ProtectedRoute>
                  <OrderHistoryScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/userProfile"
              element={
                <ProtectedRoute>
                  <UserProfileScreen />
                </ProtectedRoute>
              }
            />
            <Route path="/search" element={<SearchScreen />} />
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboardScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/productsList"
              element={
                <AdminRoute>
                  <AdminProductsScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products/:id"
              element={
                <AdminRoute>
                  <AdminProductEditScreen />
                </AdminRoute>
              }
            />
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
