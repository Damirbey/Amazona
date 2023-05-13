import { Helmet } from 'react-helmet-async';

function OrderHistoryScreen() {
  return (
    <div>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <h1 className="heading-1">Order History</h1>
      <table className="orderHistory_table">
        <tr>
          <th>ID</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>DELIVERED</th>
          <th>ACTIONS</th>
        </tr>
        <tr>
          <td>12345</td>
          <td>2023/05/13</td>
          <td>235$</td>
          <td>YES</td>
          <td>NO</td>
          <td>
            <button className="orderHistory_details_btn">DETAILS</button>
          </td>
        </tr>
      </table>
    </div>
  );
}
export default OrderHistoryScreen;
