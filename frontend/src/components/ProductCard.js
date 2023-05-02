import { Link } from 'react-router-dom';
import ProductRating from './ProductRating';
import { useContext } from 'react';
import { Store } from '../Store';
import axios from 'axios';

function ProductCard(props) {
  const { name, price, rating, numReviews, slug, image, countInStock } =
    props.product;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  /**ADDING PRODUCT TO CART */
  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      window.alert('Sorry, product is out of stock');
      return;
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
  };
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
        {countInStock > 0 ? (
          <button
            href=""
            className="btn product__btn"
            onClick={() => addToCartHandler(props.product)}
          >
            Add to cart
          </button>
        ) : (
          <span className="outOfStock">Out of Stock</span>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
