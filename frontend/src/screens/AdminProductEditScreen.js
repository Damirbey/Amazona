import React, {useEffect, useState} from "react";
import { Helmet } from "react-helmet-async";

function AdminProductEditScreen(){

    name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  category: {type: String, required:true},
  image: {type: String, required:true},
  price: {type: Number, required:true},
  countInStock: {type: Number, required:true},
  brand: {type: String, required:true},
  rating: {type: Number, required:true},
  numReviews: {type: Number, required:true},
  description: {type:String}
    return(<div className="signIn">
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
        required
        onChange={(e) => setName(e.target.value)}
      />
      <label className="form__label" htmlFor="email">
        Slug
      </label>
      <input
        type="email"
        name="email"
        id="email"
        className="form__input"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="form__label" htmlFor="password">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        className="form__input"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <label className="form__label" htmlFor="confirmPassword">
        Confirm Password
      </label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        className="form__input"
        required
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button className="btn" type="submit">
        Sign Up
      </button>
    </form>
  </div>)
}

export default AdminProductEditScreen;