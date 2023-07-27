import React, { useState } from 'react';
import './OrderForm.css';

const OrderForm = ({ products, onFormSubmit }) => {
  const [deliveryOption, setDeliveryOption] = useState('KPP');
  const [dormOption, setDormOption] = useState('0');
  const [floorOption, setFloorOption] = useState('0');
  const [roomOption, setRoomOption] = useState('0');

  const handleDeliveryOptionChange = (event) => {
    const selectedOption = event.target.value;
    setDeliveryOption(selectedOption);

    if (selectedOption === 'DORM') {
      setDormOption(''); // Clear the dorm and floor options if any of them was selected before
      setFloorOption('');
      setRoomOption(''); // Clear the room option if it was selected before
    }
  };

  const handleDormOptionChange = (event) => {
    setDormOption(event.target.value);
    setFloorOption('0');
    setRoomOption('0');
  };

  const handleFloorOptionChange = (event) => {
    setFloorOption(event.target.value);
    setRoomOption('0'); // Fix the function call here
  };

  const handleRoomOptionChange = (event) => {
    setRoomOption(event.target.value);
  };

  // Handler to submit the form data when the "mainButtonClicked" event occurs
  const handleSubmit = () => {
    const formData = {
      deliveryOption,
      dormOption,
      floorOption,
      roomOption,
      noLaterThan: document.getElementById('noLaterThan').value,
      paymentMethod: document.getElementById('paymentMethod').value,
      orderComment: document.getElementById('orderComment').value,
    };
    onFormSubmit(formData); // Call the function passed from ProductList to submit the data
  };

  return (
    <div className="order-form">
      <h2>Заказ</h2>
      <div>
        <strong>Откуда доставлять:</strong>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </div>
      <div>
        <label htmlFor="noLaterThan">Крайний срок:</label>
        <input type="datetime-local" id="noLaterThan" />
      </div>
      <div>
        <label htmlFor="paymentMethod">Метод оплаты:</label>
        <input type="text" id="paymentMethod" />
      </div>
      <div>
        <label htmlFor="orderComment">Комментарий к заказу:</label>
        <input type="text" id="orderComment" />
      </div>

      {/* New selection field for delivery options */}
      <div>
        <label htmlFor="deliveryOption">Выберите вариант доставки:</label>
        <select id="deliveryOption" value={deliveryOption} onChange={handleDeliveryOptionChange}>
          <option value="KPP">KPP</option>
          <option value="CP">CP</option>
          <option value="DORM">DORM</option>
        </select>
      </div>

      {/* Conditional rendering based on the selected delivery option */}
      {deliveryOption === 'DORM' ? ( // Add "?" after "DORM"
        <div>
          <label htmlFor="dormOption">Номер общежития:</label>
          <select id="dormOption" value={dormOption} onChange={handleDormOptionChange}>
            {/* ... options for dorm ... */}
          </select>
          <label htmlFor="floorOption">Этаж:</label>
          <select id="floorOption" value={floorOption} onChange={handleFloorOptionChange}>
            {/* ... options for floor ... */}
          </select>
      
          <label htmlFor="roomOption">Блок:</label>
          <select id="roomOption" value={roomOption} onChange={handleRoomOptionChange}>
            {/* ... options for room ... */}
          </select>
        </div>
      ) : null}

      {/* Add a button to submit the order form */}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default OrderForm;
