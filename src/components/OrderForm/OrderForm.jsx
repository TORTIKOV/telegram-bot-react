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
        <textarea id="orderComment" rows="4" cols="50" />
      </div>
    </div>
  );
};

export default OrderForm;
