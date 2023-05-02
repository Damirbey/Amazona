import { useContext } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CartScreen(props) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const navigate = useNavigate();
  /*DELETING THE WHOLE ITEM COMPLETELY FROM THE CART*/
  const removeFromCart = (item) => {
    ctxDispatch({
      type: 'CART_REMOVE_ITEM',
      payload: item,
    });
  };
  /**REMOVING OR ADDING AN ITEM IN THE CART*/
  const updateCartHandler = async (product, quantity) => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry, product is out of stock');
      return;
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
  };
  //FUNCTION USED TO REDIRECT USER TO THE SIGN IN SCREEN ONCE THEY DECIDED TO PROCEED TO CHECKOUT
  const redirect = () => {
    navigate('/signIn');
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>

      <h1 className="heading-1">Shopping Cart</h1>
      <div className="cartItems">
        {cart.cartItems.length === 0 ? (
          <div className="successMessage">
            Your cart is empty <Link to="/">Go Shopping</Link>
          </div>
        ) : (
          cart.cartItems.map((product) => (
            <div className="cartItem" key={product._id}>
              <img
                src={product.image}
                alt={product.slug}
                className="cartItem__img"
              />
              <Link to={`/product/${product.slug}`}>
                <h3 className="heading-3 product__name">{product.name}</h3>
              </Link>
              <div className="cartItem__modifier">
                <i
                  className={
                    product.quantity > 1
                      ? 'fas fa-minus-circle'
                      : 'disabled fas fa-minus-circle'
                  }
                  onClick={() =>
                    product.quantity > 1 &&
                    updateCartHandler(product, product.quantity - 1)
                  }
                ></i>
                <p>{product.quantity}</p>
                <i
                  className="fas fa-plus-circle"
                  onClick={() =>
                    updateCartHandler(product, product.quantity + 1)
                  }
                ></i>
              </div>

              <p className="cartItem__price">${product.price}</p>
              <i
                className="fas fa-trash"
                onClick={() => removeFromCart(product._id)}
              ></i>
            </div>
          ))
        )}

        <div className="cartSubtotal">
          <h1 className="heading-1">
            Subtotal ({cart.cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
            items):
            <p className="heading-1">
              {'$' +
                cart.cartItems.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.price * currentValue.quantity,
                  0
                )}
            </p>
          </h1>
          <button
            className={cart.cartItems.length > 0 ? 'btn' : 'btn__disabled'}
            onClick={cart.cartItems.length > 0 && redirect}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
export default CartScreen;
