import data from '../data';
import { Link } from 'react-router-dom';
function HomeScreen() {
  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {data.products.map((product) => (
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
