import React, { useState, useCallback, useEffect } from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';

const products = [
  { id: 1, title: 'Ozon' },
  { id: 2, title: 'Wildberries' },
  { id: 3, title: 'Лента' },
  { id: 4, title: 'Андрейка' },
  { id: 5, title: 'Аптека' }, // New item
  { id: 6, title: 'Другое(указать в комментариях)' },    // New item
];

const ProductList = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [addedItems, setAddedItems] = useState([]);
  const [orderFormData, setOrderFormData] = useState({
    deliveryOption: 'KPP',
    dormOption: '0',
    floorOption: '0',
    roomOption: '0',
    noLaterThan: '',
    paymentMethod: '',
    orderComment: '-',
  });
  const { tg } = useTelegram();

  useEffect(() => {
    // Show or hide the MainButton based on selection and form data
    if (selectedProductId && isFormValid()) {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Сделать заказ`,
      });
    } else {
      tg.MainButton.hide();
    }
  }, [selectedProductId, orderFormData, tg]);

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      formData: orderFormData,
    };
    tg.sendData(JSON.stringify(data));
  }, [addedItems, orderFormData, tg]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData, tg]);

  const onAdd = (product) => {
    // If the clicked product is the same as the selected one, reset the selection
    if (selectedProductId === product.id) {
      setSelectedProductId(null);
      setAddedItems([]);
    } else {
      setSelectedProductId(product.id);
      setAddedItems([product]);
    }
    
  };

  const isFormValid = () => {
    const {
      noLaterThan,
      paymentMethod,
      orderComment,
      deliveryOption,
    } = orderFormData;

    const selectedDate = new Date(noLaterThan);
    const currentDate = new Date();

    // Check if the selected date is not earlier than the current date and not more than one week from now
    const oneWeekFromNow = new Date(currentDate);
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

    if (selectedDate < currentDate || selectedDate > oneWeekFromNow) {
      return false;
    }

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
      {selectedProductId != null && (
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
            <label htmlFor="noLaterThan">Крайний срок:(Не более недели вперед)</label>
            <input
              className={'input'}
              type="datetime-local"
              id="noLaterThan"
              value={orderFormData.noLaterThan}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="paymentMethod">Метод оплаты доставки:</label>
            <text>Еда/Деньги/Сигареты (ваш вариант + количество)</text>
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
              <option value="KPP">КПП</option>
              <option value="CP">Центр ПУНКа</option>
              <option value="DORM">Общежитие</option>
            </select>
          </div>

          {/* Conditional rendering based on the selected delivery option */}
          {orderFormData.deliveryOption === 'DORM' && (
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
              {orderFormData.dormOption !== '0' && (
              <div>
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
              </div>
              )}
              {orderFormData.dormOption !== '0' && orderFormData.floorOption !== '0' && (
              <div>
              <label htmlFor="roomOption">Блок:</label>
              <select
                id="roomOption"
                value={orderFormData.roomOption}
                onChange={handleInputChange}
              >         
               <option value={'0'}>Не указан</option>               
                        <option value={'1'}>{orderFormData.floorOption}01</option>
                        <option value={'2'}>{orderFormData.floorOption}02</option>
                        <option value={'3'}>{orderFormData.floorOption}03</option>
                        <option value={'4'}>{orderFormData.floorOption}04</option>
                        <option value={'5'}>{orderFormData.floorOption}05</option>
                        <option value={'6'}>{orderFormData.floorOption}06</option>
                        <option value={'7'}>{orderFormData.floorOption}07</option>
                        <option value={'8'}>{orderFormData.floorOption}08</option>
                        <option value={'9'}>{orderFormData.floorOption}09</option>
                        <option value={'10'}>{orderFormData.floorOption}10</option>
                        <option value={'11'}>{orderFormData.floorOption}11</option>
                        <option value={'12'}>{orderFormData.floorOption}12</option>
                        <option value={'13'}>{orderFormData.floorOption}13</option>
                        <option value={'14'}>{orderFormData.floorOption}14</option>
                        <option value={'15'}>{orderFormData.floorOption}15</option>
                        <option value={'16'}>{orderFormData.floorOption}16</option>
                        <option value={'17'}>{orderFormData.floorOption}17</option>
                        <option value={'18'}>{orderFormData.floorOption}18</option>
                        <option value={'19'}>{orderFormData.floorOption}19</option>
                        <option value={'20'}>{orderFormData.floorOption}20</option>
                        <option value={'21'}>{orderFormData.floorOption}21</option>
                        <option value={'22'}>{orderFormData.floorOption}22</option>
                        <option value={'23'}>{orderFormData.floorOption}23</option>
                        <option value={'24'}>{orderFormData.floorOption}24</option>
                        <option value={'25'}>{orderFormData.floorOption}25</option>

              </select>
              </div>
              )}
            </div>
          )}

        </div>
      )}
     </div>

  );
};

export default ProductList;
