import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function HomeScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const result = await axios.get('/api/products');
      setProducts(result.data);
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {products.map((product) => (
          <div className="product">
            <Link to={`/product/${product.slug}`}>
              <img
                src={product.image}
                alt={product.slug}
                className="product__img"
              />
            </Link>
            <Link href={`/product/${product.slug}`}>
              <div className="product__details">
                <p>{product.name}</p>
                <p>{product.price}</p>
              </div>
            </Link>
            <button href="#">Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
