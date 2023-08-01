import React, { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import { getError } from '../utils';
//REDUCER FOR MANAGING STATES
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true, createSuccess: false };
    case 'CREATE_SUCCESS':
      return {
        ...state,
        loadingCreate: false,
        createSuccess: true,
      };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false, createSuccess: false };
    case 'CREATE_RESET':
      return { ...state, loadingCreate: false, createSuccess: false };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

function AdminProductsScreen() {
  const navigate = useNavigate();
  //RETRIEVING GLOBAL STATES
  const { state } = useContext(Store);
  const { userInfo } = state;
  //DECLARING LOCAL STATES
  const [
    { loading, products, loadingDelete, successDelete, createSuccess },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    products: [],
    error: '',
  });
  const [pageNumber, setPageNumber] = useState('');

  //FETCHING ALL PRODUCTS FROM THE BACKEND
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err });
      }
    };
    if (successDelete || createSuccess) {
      dispatch({ type: 'DELETE_RESET' });
      dispatch({ type: 'CREATE_RESET' });
    } else {
      fetchProducts();
    }
  }, [successDelete, createSuccess]);

  //IMPLEMENTING PAGINATION

  const productsPerPage = 5;
  const pagesVisited = pageNumber * productsPerPage;
  const displayProducts = products.slice(
    pagesVisited,
    productsPerPage + pagesVisited
  );
  const pageCount = Math.ceil(products.length / productsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  //CREATING NEW PRODUCT
  const onCreateProductHandler = async () => {
    if (window.confirm('Do you want to create a new product?')) {
      try {
        dispatch({ type: 'CREATE_REQUEST' });
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/products`,
          {},
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        toast.success('product created successfully');
        dispatch({ type: 'CREATE_SUCCESS' });
        navigate(`/admin/productsList`);
      } catch (err) {
        toast.error(getError(err));
        dispatch({ type: 'CREATE_FAIL' });
      }
    }
  };
  //DELETING PRODUCT
  const onDeleteProduct = async (productToDelete) => {
    if (window.confirm('Are you sure to delete the current product?')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(
          `/api/products/admin/deleteProduct/${productToDelete._id}`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'DELETE_SUCCESS' });
        toast.success('Product deleted successfully');
      } catch (err) {
        toast.error(getError(err));
        dispatch({ type: 'DELETE_FAIL' });
      }
    }
  };
  return (
    <div >
      <div className="product_list_header">
        <h1>Products List</h1>
        <button className="btn" onClick={onCreateProductHandler}>
          Create New Product
        </button>
      </div>
      {loading || loadingDelete ? (
        <Spinner />
      ) : products.length === 0 ? (
        <div className="alertMessage">No Products Found</div>
      ) : (
        <div>
          <table className="table">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
            {displayProducts.map((product, i) => (
              <tr key={i}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    className="btn_gray"
                    onClick={() => navigate(`/admin/products/${product._id}`)}
                  >
                    Edit
                  </button>
                  &nbsp;
                  <button
                    className="btn_gray"
                    onClick={() => onDeleteProduct(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </table>
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={'paginationBttns'}
            previousLinkClassName={'previousBttn'}
            nextLinkClassName={'nextBttn'}
            disabledClassName={'paginationDisabled'}
            activeClassName={'paginationActive'}
          />
        </div>
      )}
    </div>
  );
}
export default AdminProductsScreen;
