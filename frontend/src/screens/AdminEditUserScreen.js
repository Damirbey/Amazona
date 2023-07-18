import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

function AdminEditUserScreen() {
  //LOCAL STATES
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  //UPDATING USER
  const onSubmitHandler = async () => {
    try {
    } catch (err) {}
  };
  return (
    <div>
      <Helmet>
        <title>Edit User</title>
      </Helmet>
      <h1 className="heading-1">User Profile</h1>

      <div className="signIn">
        <form className="form" onSubmit={onSubmitHandler} method="POST">
          <label className="form__label" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="email"
            id="name"
            className="form__input"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="form__label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form__input"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="form__label" htmlFor="isAdmin">
            Password
          </label>
          <input
            type="checkbox"
            name="isAdmin"
            id="isAdmin"
            className="form__input"
            checked={isAdmin}
            required
            onChange={(e) => setIsAdmin(e.target.checked)}
          />

          <button className="btn" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminEditUserScreen;
