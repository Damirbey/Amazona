import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function SearchBox() {
  const navigate = useNavigate();
  //DECLARING LOCAL STATES
  const [query, setQuery] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    e.target.reset();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (
    <form onSubmit={onSubmitHandler} className="searchBox">
      <input
        type="text"
        placeholder="Search for product..."
        onChange={(e) => setQuery(e.target.value)}
        className="searchBox__input"
      />
      <button type="submit" className="searchBox__btn">
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
}
export default SearchBox;
