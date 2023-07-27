import React from 'react';

const OrderForm = ({ products }) => {
  return (
    <div className="order-form">
      <h2>Order Form</h2>
      <div>
        <strong>Selected Product(s):</strong>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </div>
      <div>
        <label htmlFor="notEarlierThan">Not Earlier Than:</label>
        <input type="date" id="notEarlierThan" />
      </div>
      <div>
        <label htmlFor="noLaterThan">No Later Than:</label>
        <input type="date" id="noLaterThan" />
      </div>
      <div>
        <label htmlFor="paymentMethod">Payment Method:</label>
        <select id="paymentMethod">
          <option value="cash">Cash</option>
          <option value="creditCard">Credit Card</option>
          <option value="bankTransfer">Bank Transfer</option>
        </select>
      </div>
      <div>
        <label htmlFor="orderComment">Order Comment:</label>
        <textarea id="orderComment" rows="4" cols="50" />
      </div>
    </div>
  );
};

export default OrderForm;
