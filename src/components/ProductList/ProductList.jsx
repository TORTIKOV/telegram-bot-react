import React, { useState } from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import OrderForm from '../OrderForm/OrderForm';
import { useTelegram } from '../../hooks/useTelegram';
import { useCallback, useEffect } from 'react';

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

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
    };
    tg.sendData(JSON.stringify(data));
  }, [addedItems]);

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

  return (
    <div className={'list'}>
      <div className={'split-container'}>
        <label htmlFor="split">Split:</label>
        <select id="split" value={split} onChange={handleSplitChange}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>

      {split === 'no' && (
        <>
          {products.map((item) => (
            <ProductItem
              key={item.id}
              product={item}
              onAdd={onAdd}
              className={'item'}
            />
          ))}
          <OrderForm products={addedItems} />
        </>
      )}

      {split === 'yes' && (
        <>
          {addedItems.map((item, index) => (
            <div key={index}>
              <h3>Order Form {index + 1}</h3>
              <OrderForm products={[item]} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ProductList;
