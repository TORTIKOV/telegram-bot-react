import React from 'react';
import './OrderForm.css';

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
      {/* No Earlier Than field is removed */}
      <div>
        <label htmlFor="noLaterThan">No Later Than:</label>
        <input type="datetime-local" id="noLaterThan" />
      </div>
      {/* Payment Method field replaced with a text input */}
      <div>
        <label htmlFor="paymentMethod">Payment Method:</label>
        <input type="text" id="paymentMethod" />
      </div>
      <div>
        <label htmlFor="orderComment">Order Comment:</label>
        <input type="text" id="orderComment" />
      </div>
    </div>
  );
};

export default OrderForm;
