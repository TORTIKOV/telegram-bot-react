import React, { useState, useCallback, useEffect } from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';

const products = [
  { id: 1, title: 'Ozon' },
  { id: 2, title: 'Wb' },
  { id: 3, title: 'Lenta' },
  { id: 4, title: 'Андрейка' },
];

const ProductList = () => {
  const [addedItems, setAddedItems] = useState([]);
  const [orderFormData, setOrderFormData] = useState({
    deliveryOption: 'KPP',
    dormOption: '0',
    floorOption: '0',
    roomOption: '0',
    noLaterThan: '',
    paymentMethod: '',
    orderComment: '',
  });
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      formData: orderFormData,
    };
    tg.sendData(JSON.stringify(data));
  }, [addedItems, orderFormData]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData]);

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id);
    let newItems = [];

    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [product];
    }

    setAddedItems(newItems);

    if (newItems.length === 0 || !isFormFilled()) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Сделать заказ`,
      });
    }
  };

  const isFormFilled = () => {
    const {
      noLaterThan,
      paymentMethod,
      orderComment,
      deliveryOption,
    } = orderFormData;

    if (deliveryOption === 'DORM') {
      return (
        noLaterThan.trim() !== '' &&
        paymentMethod.trim() !== '' &&
        orderComment.trim() !== '' &&
        orderFormData.dormOption.trim() !== '' &&
        orderFormData.floorOption.trim() !== '' &&
        orderFormData.roomOption.trim() !== ''
      );
    }

    return (
      noLaterThan.trim() !== '' &&
      paymentMethod.trim() !== '' &&
      orderComment.trim() !== ''
    );
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setOrderFormData({
      ...orderFormData,
      [id]: value,
    });
  };

  return (
    <div className={'list'}>
      {products.map((item) => (
        <ProductItem key={item.id} product={item} onAdd={onAdd} className={'item'} />
      ))}

      <div className="order-form">
        <h2>Заказ</h2>
        <div>
          <strong>Откуда доставлять:</strong>
          <ul>
            {addedItems.map((product) => (
              <li key={product.id}>{product.title}</li>
            ))}
          </ul>
        </div>
        <div>
          <label htmlFor="noLaterThan">Крайний срок:</label>
          <input
            className={'input'}
            type="datetime-local"
            id="noLaterThan"
            value={orderFormData.noLaterThan}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="paymentMethod">Метод оплаты:</label>
          <input
            type="text"
            id="paymentMethod"
            value={orderFormData.paymentMethod}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="orderComment">Комментарий к заказу:</label>
          <input
            type="text"
            id="orderComment"
            value={orderFormData.orderComment}
            onChange={handleInputChange}
          />
        </div>

        {/* New selection field for delivery options */}
        <div>
          <label htmlFor="deliveryOption">Выберите вариант доставки:</label>
          <select
            id="deliveryOption"
            value={orderFormData.deliveryOption}
            onChange={handleInputChange}
          >
            <option value="KPP">KPP</option>
            <option value="CP">CP</option>
            <option value="DORM">DORM</option>
          </select>
        </div>

        {/* Conditional rendering based on the selected delivery option */}
        {orderFormData.deliveryOption === 'DORM' ? (
          <div>
            <label htmlFor="dormOption">Номер общежития:</label>
            <select
              id="dormOption"
              value={orderFormData.dormOption}
              onChange={handleInputChange}
            >
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
            <select
              id="floorOption"
              value={orderFormData.floorOption}
              onChange={handleInputChange}
            >
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
            <select
              id="roomOption"
              value={orderFormData.roomOption}
              onChange={handleInputChange}
            >
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
    </div>
  );
};

export default ProductList;
