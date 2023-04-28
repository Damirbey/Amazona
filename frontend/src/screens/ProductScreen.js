import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useReducer } from 'react';
import axios from 'axios';

//CREATED REDUCER TO MANAGE STATE
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, product: action.payload };
    case 'FETCH_FAIL':
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
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchProduct();
  }, [slug]);
  console.log(product);
  return (
    <div className="productScreen">
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      {error ? (
        error
      ) : (
        <div>
          <img src={product.image} alt={product.slug} />
          <h2>{product.name}</h2>
        </div>
      )}
    </div>
  );
}
export default ProductScreen;
