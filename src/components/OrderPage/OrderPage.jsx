import React from 'react';

const OrderPage = () => {
  // Sample order data, replace this with the actual state or data you have
  const order = [
    { id: 1, name: 'Ozon',},
    { id: 2, name: 'Wb'},
    { id: 3, name: 'Lenta'},
    { id: 4, name: 'Andreyka'}
    // Add more order items as needed
  ];

  return (
    <div>
      <h1>Your Order</h1>
      <ul>
        {order.map((item) => (
          <li key={item.id}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderPage;
