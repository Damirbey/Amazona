import React, { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductRating from '../components/ProductRating';

const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$51 to $200',
    value: '51-200',
  },
  {
    name: '$201 to $1000',
    value: '201-1000',
  },
];
const ratings = [
  {
    name: '4stars & up',
    rating: 4,
  },

  {
    name: '3stars & up',
    rating: 3,
  },

  {
    name: '2stars & up',
    rating: 2,
  },

  {
    name: '1stars & up',
    rating: 1,
  },
];

function SearchScreen() {
  return (
    <div className="searchScreen">
      <div className="searchScreen__filters">
        <div className="searchScreen__filters__categories">
          <h2>Departments</h2>
          <ul>
            <li>
              <Link>Any</Link>
            </li>
            <li>
              <Link>Pants</Link>
            </li>
            <li>
              <Link>Shirts</Link>
            </li>
          </ul>
        </div>
        <div className="searchScreen__filters__categories">
          <h2>Price</h2>
          <ul>
            <li>
              <Link>Any</Link>
            </li>
            {prices.map((price) => {
              return (
                <li>
                  <Link>{price.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="searchScreen__filters__categories">
          <h2>Average Customer Review</h2>
          <ul>
            <li>
              <Link>Any</Link>
            </li>
            {ratings.map((r) => {
              return (
                <li>
                  <Link>
                    <ProductRating rating={r.rating} caption={'& up'} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="searchScreen__results">
        <h3>Results</h3>
      </div>
      <div className="searchScreen__sort">
        <h3>Sort</h3>
      </div>
    </div>
  );
}

export default SearchScreen;
