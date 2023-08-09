import React, { useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from "../../hooks/useTelegram";

const Form = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [dorm, setDorm] = useState('0');
    const [floor, setFloor] = useState('0');
    const [room, setRoom] = useState('0');
    const [agreementAccepted, setAgreementAccepted] = useState(false); 

    const { tg } = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            name: name,
            phone: phone,
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
        if (!phone || typeof phone !== "number" || isNaN(phone) || phone.toString().length !== 11 || !name ||
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
        const inputPhone = e.target.value;
        const parsedPhone = parseInt(inputPhone, 10);
        if (isNaN(parsedPhone)) {
            setPhone('');
        } else {
            setPhone(parsedPhone);
        }
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
        <div className={"form"}>
            <div className="agreement">
            <label>
                <input
                    type="checkbox"
                    checked={agreementAccepted}
                    onChange={onAgreementChange}
                 />
            Я прочитал и согласен с условиями <a href="/agreement">пользовательского соглашения</a>
            </label>
        </div>
            <h3>Введите ваши данные</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Имя'}
                value={name}
                onChange={onChangeName}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Телефон'}
                value={phone}
                onChange={onChangePhone}
            />
            <div>
                <label htmlFor="dorm">Номер общежития </label>
                <select value={dorm} onChange={onChangeDorm} className={'select'}>
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
            {dorm !== '0' && (  // Conditionally render the floor select based on dorm selection
                <div>
                    <label htmlFor="floor">Этаж </label>
                    <select value={floor} onChange={onChangeFloor} className={'select'}>
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
            {floor !== '0' && (  // Conditionally render the room select based on floor selection
                <div>
                    <label htmlFor="room">Номер комнаты </label>
                    <select value={room} onChange={onChangeRoom} className={'select'}>
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
                    </select>
                </div>
            )}
            
        </div>
    );
};

export default Form;
