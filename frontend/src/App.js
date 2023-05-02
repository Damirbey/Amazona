import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { Store } from './Store';
import { useContext } from 'react';
import CartScreen from './screens/CartScreen';
import SignInScreen from './screens/SignInScreen';

function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <BrowserRouter>
      <div className="App">
        <header className="header">
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
