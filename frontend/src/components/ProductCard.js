import { Link } from 'react-router-dom';

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
          <p className="product__rating">
            <i
              className={
                rating >= 1
                  ? 'fas fa-star'
                  : rating >= 0.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            ></i>
            <i
              className={
                rating >= 2
                  ? 'fas fa-star'
                  : rating >= 1.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            ></i>
            <i
              className={
                rating >= 3
                  ? 'fas fa-star'
                  : rating >= 2.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            ></i>
            <i
              className={
                rating >= 4
                  ? 'fas fa-star'
                  : rating >= 3.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            ></i>
            <i
              className={
                rating >= 5
                  ? 'fas fa-star'
                  : rating >= 4.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            ></i>
            <span className="product__reviews">{numReviews} reviews</span>
          </p>
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
