import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="header">
          <Link to="/" className="header__brandName">
            amazona
          </Link>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
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
