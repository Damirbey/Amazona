import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

function AdminProductEditScreen() {
  //LOCAL STATES
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  //HANDLING SUBMIT REQUEST
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
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
