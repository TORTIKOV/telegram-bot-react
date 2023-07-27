// OrderForm.js
import React, { useState } from 'react';
import './OrderForm.css';

const OrderForm = ({ products, onOrderSubmit }) => {
  const [deliveryOption, setDeliveryOption] = useState('KPP');
  const [dormOption, setDormOption] = useState('0');
  const [floorOption, setFloorOption] = useState('0');
  const [roomOption, setRoomOption] = useState('0');
  const [noLaterThan, setNoLaterThan] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderComment, setOrderComment] = useState('');

  const handleDeliveryOptionChange = (event) => {
    const selectedOption = event.target.value;
    setDeliveryOption(selectedOption);

    if (selectedOption === 'DORM') {
      setDormOption('');
      setFloorOption('1');
      setRoomOption('');
    }
  };

  const handleDormOptionChange = (event) => {
    setDormOption(event.target.value);
    setFloorOption('0');
    setRoomOption('0');
  };

  const handleFloorOptionChange = (event) => {
    setFloorOption(event.target.value);
    setRoomOption('0');
  };

  const handleRoomOptionChange = (event) => {
    setRoomOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const orderData = {
      deliveryOption,
      dormOption,
      floorOption,
      roomOption,
      noLaterThan,
      paymentMethod,
      orderComment,
      products,
    };
    onOrderSubmit(orderData);
  };

  return (
    <div className="order-form">
      <h2>Заказ</h2>
      <form onSubmit={handleSubmit}>
        {/* ... existing form fields ... */}
        {/* New form fields */}
        <div>
          <label htmlFor="noLaterThan">Крайний срок:</label>
          <input type="datetime-local" id="noLaterThan" value={noLaterThan} onChange={(e) => setNoLaterThan(e.target.value)} />
        </div>
        <div>
          <label htmlFor="paymentMethod">Метод оплаты:</label>
          <input type="text" id="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />
        </div>
        <div>
          <label htmlFor="orderComment">Комментарий к заказу:</label>
          <input type="text" id="orderComment" value={orderComment} onChange={(e) => setOrderComment(e.target.value)} />
        </div>
        <button type="submit">Сделать заказ</button>
      </form>
    </div>
  );
};

export default OrderForm;
