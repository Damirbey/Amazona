import { Link } from 'react-router-dom';
import ProductRating from './ProductRating';

function ProductCard(props) {
  const { name, price, rating, numReviews, slug, image } = props.product;
  return (
    <div className="product">
      <Link to={`/product/${slug}`}>
        <img src={image} alt={slug} className="product__img" />
      </Link>

      <div className="product__details">
        <Link href={`/product/${slug}`}>
          <p className="product__name">{name}</p>
          <ProductRating rating={rating} numReviews={numReviews} />
          <p className="product__price">${price}</p>
        </Link>
        <button href="" className="btn product__btn">
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
