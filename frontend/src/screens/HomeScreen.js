import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
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
function HomeScreen() {
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
      <Helmet>
        <title>Amazona</title>
      </Helmet>
      <h1 className="heading-1">Featured Products</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="products">
          {products.map((eachProduct) => (
            <ProductCard key={eachProduct.slug} product={eachProduct} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
