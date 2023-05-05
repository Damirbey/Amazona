import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';

function PlaceOrderScreen() {
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="order">
        <div className="order__details">
          <div className="order__details__shipping">
            <h3 className="heading-3">Shipping</h3>
            <p>
              <span>Name:</span> Damir Yodgorov
            </p>
            <p>
              <span>Address:</span>Random Address
            </p>

            <Link to="/payment">Edit</Link>
          </div>
          <div className="order__details__payment">
            <h3 className="heading-3">Payment</h3>
            <p>
              <span>Method:</span> PayPal
            </p>
            <Link to="/payment">Edit</Link>
          </div>
          <div className="order__details__items">
            <h3 className="heading-3">Items</h3>
          </div>
        </div>

        <div className="order__summary">
          <h3 className="heading-3">Order Summary</h3>
          <table>
            <tr>
              <td>Items</td>
              <td>$240</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>$0</td>
            </tr>
            <tr>
              <td>Tax</td>
              <td>$36</td>
            </tr>
            <tr>
              <td>Order Total</td>
              <td>$276</td>
            </tr>
          </table>
          <button className="btn">Place Order</button>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
