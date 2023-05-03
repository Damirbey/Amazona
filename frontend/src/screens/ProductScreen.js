import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import ProductRating from '../components/ProductRating';
import { Store } from '../Store';

//CREATED REDUCER TO MANAGE STATE
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, product: action.payload };
    case 'FETCH_FAIL':
      console.log('HERE');
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const [{ loading, product, error }, dispatch] = useReducer(reducer, {
    loading: true,
    product: [],
    error: '',
  });
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  //FETCHING THE PRODUCT FROM THE BACKEND
  useEffect(() => {
    const fetchProduct = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.a });
      }
    };
    fetchProduct();
  }, [slug]);

  //IMPLEMENTING ADD TO CART
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    console.log(data);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock.');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/cart');
  };

  //RENDERING THE COMPONENT

  return (
    <div className="product__screen">
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      {loading ? (
        <div className="alertMessage">{error}</div>
      ) : (
        <React.Fragment>
          <img
            src={product.image}
            alt={product.slug}
            className="product__image"
          />

          <div className="product__information">
            <ul>
              <li>
                <h2>{product.name}</h2>
              </li>
              <li>
                <ProductRating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </li>
              <li>
                <div>
                  <p>Description:</p>
                  <p>{product.description}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="product__availability">
            <p>Price:</p>
            <p>${product.price}</p>
            <p>Status:</p>
            <p>
              {product.countInStock > 0 ? (
                <span className="inStock">Available</span>
              ) : (
                <span className="outOfStock">Out of stock</span>
              )}
            </p>

            <button className="btn" onClick={addToCartHandler}>
              Add to cart
            </button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
export default ProductScreen;
