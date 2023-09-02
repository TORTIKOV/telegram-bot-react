import React, { useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from "../../hooks/useTelegram";

const Form = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('+7');
    const [dorm, setDorm] = useState('0');
    const [floor, setFloor] = useState('0');
    const [room, setRoom] = useState('0');
    const [agreementAccepted, setAgreementAccepted] = useState(false); 

    const { tg } = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            name: name,
            phone: phone.replace(/[^0-9]/g, ''), 
            dorm: dorm,
            floor: floor,
            room: room
        }
        tg.sendData(JSON.stringify(data));
    }, [name, phone, dorm, floor, room, agreementAccepted]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData]);

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        });
    }, []);

    useEffect(() => {
        if (!phone || isNaN(phone) || phone.length < 12 || !name ||
        !agreementAccepted) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [name, phone, agreementAccepted]);

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const onChangePhone = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        setPhone('+' + numericValue);
    };

    const onChangeDorm = (e) => {
        setDorm(e.target.value);
        setFloor('0');
        setRoom('0');
    };

    const onChangeFloor = (e) => {
        setFloor(e.target.value);
        setRoom('0');
    };

    const onChangeRoom = (e) => {
        setRoom(e.target.value);
    };

    const onAgreementChange = (e) => {
        setAgreementAccepted(e.target.checked);
    };

    return (
        <div className="form">
          <div className="agreement">
            <label>
              <input
                type="checkbox"
                checked={agreementAccepted}
                onChange={onAgreementChange}
              />
              Я прочитал и согласен с условиями{" "}
              <a href="/agreement">пользовательского соглашения</a>
            </label>
          </div>
          <h3>Введите ваши данные</h3>
          <input
            className="input"
            type="text"
            placeholder="Имя"
            value={name}
            onChange={onChangeName}
          />
          <div className="phone-input-container">
                <input
                    className="phone-input"
                    type="text"
                    placeholder="+7 ___ ___ __ __"
                    maxLength="15" // Total length of "+7 ___ ___ __ __"
                    value={phone}
                    onChange={onChangePhone}
                />
            </div>
          <div className="select-container">
            <span className="select-label">Общежитие</span>
            <select value={dorm} onChange={onChangeDorm} className="select">
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
          </div>
          {dorm !== "0" && (
            <div className="select-container">
              <span className="select-label">Этаж</span>
              <select value={floor} onChange={onChangeFloor} className="select">
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
          {floor !== "0" && (
            <div className="select-container">
              <span className="select-label">Комната</span>
              <select value={room} onChange={onChangeRoom} className="select">
              <option value={'0'}>Не указан</option>               
                        <option value={'1'}>{floor}01</option>
                        <option value={'2'}>{floor}02</option>
                        <option value={'3'}>{floor}03</option>
                        <option value={'4'}>{floor}04</option>
                        <option value={'5'}>{floor}05</option>
                        <option value={'6'}>{floor}06</option>
                        <option value={'7'}>{floor}07</option>
                        <option value={'8'}>{floor}08</option>
                        <option value={'9'}>{floor}09</option>
                        <option value={'10'}>{floor}10</option>
                        <option value={'11'}>{floor}11</option>
                        <option value={'12'}>{floor}12</option>
                        <option value={'13'}>{floor}13</option>
                        <option value={'14'}>{floor}14</option>
                        <option value={'15'}>{floor}15</option>
                        <option value={'16'}>{floor}16</option>
                        <option value={'17'}>{floor}17</option>
                        <option value={'18'}>{floor}18</option>
                        <option value={'19'}>{floor}19</option>
                        <option value={'20'}>{floor}20</option>
                        <option value={'21'}>{floor}21</option>
              </select>
            </div>
          )}
        </div>
      );
};

export default Form;
