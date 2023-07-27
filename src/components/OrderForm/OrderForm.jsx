import React, { useState } from 'react';
import './OrderForm.css';

const OrderForm = ({ products }) => {
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
          <option value={'0'}>Не указан</option>
                    <option value={'10'}>№10</option>
                    <option value={'12'}>№12</option>
                    <option value={'13'}>№13</option>
                    <option value={'14'}>№14</option>
                    <option value={'15'}>№15</option>
                    <option value={'16'}>№16</option>
                    <option value={'20'}>№20</option>
                    <option value={'21'}>№21</option>
                    <option value={'22'}>№22</option>
                    <option value={'23'}>№23</option>
          </select>
          <label htmlFor="floorOption">Этаж:</label>
          <select id="floorOption" value={floorOption} onChange={handleFloorOptionChange}>
          <option value={'0'}>Не указан</option>
                        <option value={'1'}>1</option>
                        <option value={'2'}>2</option>
                        <option value={'3'}>3</option>
                        <option value={'4'}>4</option>
                        <option value={'5'}>5</option>
                        <option value={'6'}>6</option>
                        <option value={'7'}>7</option>
                        <option value={'8'}>8</option>
                        <option value={'9'}>9</option>
                        <option value={'10'}>10</option>
                        <option value={'11'}>11</option>
                        <option value={'12'}>12</option>
                        <option value={'13'}>13</option>
                        <option value={'14'}>14</option>
          </select>
      
          <label htmlFor="roomOption">Блок:</label>
          <select id="roomOption" value={roomOption} onChange={handleRoomOptionChange}>
          <option value={'0'}>Не указан</option>               
                        <option value={'1'}>1</option>
                        <option value={'2'}>2</option>
                        <option value={'3'}>3</option>
                        <option value={'4'}>4</option>
                        <option value={'5'}>5</option>
                        <option value={'6'}>6</option>
                        <option value={'7'}>7</option>
                        <option value={'8'}>8</option>
                        <option value={'9'}>9</option>
                        <option value={'10'}>10</option>
                        <option value={'11'}>11</option>
                        <option value={'12'}>12</option>
                        <option value={'13'}>13</option>
                        <option value={'14'}>14</option>
          </select>
        </div>
      ) : null}
    </div>
  );
};

export default OrderForm;
