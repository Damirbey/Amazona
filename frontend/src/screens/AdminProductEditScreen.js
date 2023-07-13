import React, { useEffect, useState, useContext, useReducer } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { toast } from 'react-toastify';

//DECLARING REDUCER TO HANDLE COMPLEX LOCAL STATES
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};
function AdminProductEditScreen() {
  const navigate = useNavigate();
  //RETREIVING PRODUCT ID FROM URL
  const params = useParams();
  const { id: productId } = params;
  //RETREIVING GLOBAL STATES FROM THE CONTEXT STORE
  const { state } = useContext(Store);
  const { userInfo } = state;
  //LOCAL STATES
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  //FETCHING SELECTED PRODUCT FROM THE BACKEND
  useEffect(() => {
    const fetchProduct = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        setSlug(data.slug);
        setCategory(data.category);
        setImage(data.image);
        setPrice(data.price);
        setCountInStock(data.countInStock);
        setBrand(data.brand);
        setDescription(data.description);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL' });
      }
    };
    fetchProduct();
  }, [productId]);
  //HANDLING SUBMIT REQUEST
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        '/api/products/admin/updateProduct',
        {
          id: productId,
          name,
          slug,
          price,
          image,
          countInStock,
          description,
          brand,
          category,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Product Updated Successfully');
      navigate('/admin/productsList');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };
  return loading ? (
    <Spinner />
  ) : (
    <div className="signIn">
      <Helmet>
        <title>Edit Product</title>
      </Helmet>
      <h1 className="heading-1">Edit Product</h1>
      <form className="form" onSubmit={onSubmitHandler} method="POST">
        <label className="form__label" htmlFor="name">
          Product Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="form__input"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <label className="form__label" htmlFor="slug">
          Slug
        </label>
        <input
          type="text"
          name="slug"
          id="slug"
          className="form__input"
          value={slug}
          required
          onChange={(e) => setSlug(e.target.value)}
        />
        <label className="form__label" htmlFor="category">
          Category
        </label>
        <input
          type="text"
          name="category"
          id="category"
          className="form__input"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />
        <label className="form__label" htmlFor="price">
          Price
        </label>
        <input
          type="text"
          name="price"
          id="price"
          className="form__input"
          value={price}
          required
          onChange={(e) => setPrice(e.target.value)}
        />
        <label className="form__label" htmlFor="image">
          Image File
        </label>
        <input
          type="text"
          name="image"
          id="image"
          className="form__input"
          value={image}
          required
          onChange={(e) => setImage(e.target.value)}
        />
        <label className="form__label" htmlFor="countInStock">
          Count In Stock
        </label>
        <input
          type="text"
          name="countInStock"
          id="countInStock"
          className="form__input"
          value={countInStock}
          required
          onChange={(e) => setCountInStock(e.target.value)}
        />
        <label className="form__label" htmlFor="brand">
          Brand
        </label>
        <input
          type="text"
          name="brand"
          id="brand"
          className="form__input"
          value={brand}
          required
          onChange={(e) => setBrand(e.target.value)}
        />
        <label className="form__label" htmlFor="description">
          Description
        </label>
        <textarea
          type="text"
          name="description"
          id="description"
          className="form__input"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

export default AdminProductEditScreen;
