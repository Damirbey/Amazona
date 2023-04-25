import { Link } from 'react-router-dom';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';

function HomeScreen() {
  //DECLARED REDUCER TO MANAGE COMPLEX STATES
  const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, products: action.payload };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  //MANAGING STATES BY THE REDUCER HOOKs
  const [{ products, loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    products: [],
  });

  //FIRST FUNCTION TO RUN WHEN COMPONENT IS RENDERED
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Featured Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
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
      )}
    </div>
  );
}

export default HomeScreen;
