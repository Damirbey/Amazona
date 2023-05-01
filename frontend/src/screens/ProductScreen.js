import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
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

  const addToCartHandler = () => {
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product },
    });
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
                <div className="inStock">Available</div>
              ) : (
                <div className="outOfStock">Out of stock</div>
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
