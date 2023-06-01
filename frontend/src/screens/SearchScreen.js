import React, { useEffect, useReducer, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProductRating from '../components/ProductRating';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

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
//DECLARING REDUCER TO WORK WITH COMPLEX STATES
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        countProducts: action.payload.countProducts,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function SearchScreen() {
  const navigate = useNavigate();
  //FETCHING PARAMETERS FROM URL
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const query = sp.get('query') || 'all';
  const category = sp.get('category') || 'all';
  const price = sp.get('price') || 'all';
  const rating = sp.get('rating') || 'all';
  const order = sp.get('order') || 'newest';
  //const page = sp.get('page') || 1;
  //DECLARING STATES FOR THE PAGE
  const [{ loading, products, countProducts, error }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      error: '',
      products: [],
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(
          `/api/products/search?query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [query, category, price, rating, order, error]);

  //FETCHING ALL CATEGORIES FROM THE BACKEND
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/products/categories');
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [dispatch]);
  //FILTERING PRODUCTS BASED ON THE SELECTED USER OPTION
  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterPrice = filter.price || price;
    const filterRating = filter.rating || rating;
    const filterQuery = filter.query || query;
    const filterOrder = filter.order || order;
    return `/search?query=${filterQuery}&category=${filterCategory}&order=${filterOrder}&price=${filterPrice}&rating=${filterRating}`;
  };
  console.log(products);
  //IMPLEMENTING PAGINATION
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 2;
  const pagesVisited = pageNumber * productsPerPage;
  const displayProducts = products.slice(
    pagesVisited,
    productsPerPage + pagesVisited
  );
  const pageCount = Math.ceil(products.length / productsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className="searchScreen">
      <div className="searchScreen__filters">
        <div className="searchScreen__filters__categories">
          <h2>Categories</h2>
          <ul>
            <li className={'all' === category ? 'text-bold links' : 'links'}>
              <Link to={getFilterUrl({ category: 'all' })}>Any</Link>
            </li>
            {categories.map((c) => {
              return (
                <li
                  key={c}
                  className={c === category ? 'text-bold links' : 'links'}
                >
                  <Link to={getFilterUrl({ category: c })}>{c}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="searchScreen__filters__categories">
          <h2>Price</h2>
          <ul>
            <li className={price === 'all' ? 'text-bold links' : 'links'}>
              <Link>Any</Link>
            </li>
            {prices.map((p) => {
              return (
                <li
                  key={p.name}
                  className={price === p.value ? 'text-bold links' : 'links'}
                >
                  <Link to={getFilterUrl({ price: p.value })}>{p.name}</Link>
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
                <li
                  key={r.name}
                  className={rating === r.rating ? 'text-bold' : ''}
                >
                  <Link to={getFilterUrl({ rating: r.rating })}>
                    <ProductRating rating={r.rating} caption={'& up'} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="searchScreen__results">
        <h3 style={{ display: 'block' }}>Results</h3>
        <div className="product_results">
          {products.length == 0 ? (
            <div className="alertMessage">No Product is Found</div>
          ) : (
            displayProducts.map((product) => {
              return <ProductCard key={product.slug} product={product} />;
            })
          )}
        </div>
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

      <div className="searchScreen__sort">
        <span className="text-bold">Sort by </span>
        <select
          value={order}
          onChange={(e) => {
            navigate(getFilterUrl({ order: e.target.value }));
          }}
        >
          <option value="newest">Newest Arrivals</option>
          <option value="lowest">Price: Low to High</option>
          <option value="highest">Price: High to Low</option>
          <option value="toprated">Avg. Customer Reviews</option>
        </select>
      </div>
    </div>
  );
}

export default SearchScreen;
