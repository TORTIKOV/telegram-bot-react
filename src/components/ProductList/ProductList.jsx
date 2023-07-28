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
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [addedItems, setAddedItems] = useState([]);
  const [orderFormData, setOrderFormData] = useState({
    deliveryOption: 'KPP',
    dormOption: '',
    floorOption: '',
    roomOption: '',
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
    // If the clicked product is the same as the selected one, reset the selection
    if (selectedProductId === product.id) {
      setSelectedProductId(null);
      setAddedItems([]);
    } else {
      setSelectedProductId(product.id);
      setAddedItems([product]);
    }
    if (!isFormFilled()) {
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
        <ProductItem
          key={item.id}
          product={item}
          onAdd={onAdd}
          isSelected={selectedProductId === item.id}
          isClickable={!selectedProductId || selectedProductId === item.id}
          className={'item'}
        />
      ))}
      {selectedProductId && (
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
                {/* ... options for dorm ... */}
              </select>
              <label htmlFor="floorOption">Этаж:</label>
              <select
                id="floorOption"
                value={orderFormData.floorOption}
                onChange={handleInputChange}
              >
                {/* ... options for floor ... */}
              </select>

              <label htmlFor="roomOption">Блок:</label>
              <select
                id="roomOption"
                value={orderFormData.roomOption}
                onChange={handleInputChange}
              >
                {/* ... options for room ... */}
              </select>
            </div>
          ) : null}

        </div>
      )};
     </div>

  );
};

export default ProductList;
