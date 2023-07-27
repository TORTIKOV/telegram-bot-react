// ProductList.js
import React, { useState, useCallback, useEffect } from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import OrderForm from '../OrderForm/OrderForm';
import { useTelegram } from '../../hooks/useTelegram';

const products = [
  { id: 1, title: 'Ozon' },
  { id: 2, title: 'Wb' },
  { id: 3, title: 'Lenta' },
  { id: 4, title: 'Андрейка' },
];

const ProductList = () => {
  const [addedItems, setAddedItems] = useState([]);
  const [split, setSplit] = useState('no'); // Default value: "no"

  const { tg } = useTelegram();

  const onSendData = useCallback((data) => {
    tg.sendData(JSON.stringify(data));
  }, [tg]);

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
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Сделать заказ`,
      });
    }
  };

  const handleSplitChange = (event) => {
    setSplit(event.target.value);
  };

  const handleOrderSubmit = (orderData) => {
    // You can process the orderData here or directly send it to the sendData function
    onSendData(orderData);
  };

  return (
    <div className={'list'}>
      {products.map((item) => (
        <ProductItem
          key={item.id}
          product={item}
          onAdd={onAdd}
          className={'item'}
        />
      ))}

      <div className={'split-container'}>
        <label htmlFor="split">Split:</label>
        <select id="split" value={split} onChange={handleSplitChange}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>

      {split === 'no' && (
        <OrderForm products={addedItems} onOrderSubmit={handleOrderSubmit} />
      )}

      {split === 'yes' && (
        addedItems.map((item, index) => (
          <div key={index}>
            <OrderForm products={[item]} onOrderSubmit={handleOrderSubmit} />
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
