import React, { useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from "../../hooks/useTelegram";

const Form = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [dorm, setDorm] = useState('0');
    const [floor, setFloor] = useState('0');
    const [room, setRoom] = useState('0');

    // New state variables to track whether each select element is selected or not
    const [isDormSelected, setIsDormSelected] = useState(false);
    const [isFloorSelected, setIsFloorSelected] = useState(false);
    const [isRoomSelected, setIsRoomSelected] = useState(false);

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
    }, [name, phone, dorm, floor, room]);

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
        if (!phone || typeof phone !== "number" || isNaN(phone) || phone.toString().length !== 11 || !name) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [name, phone]);

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
        setIsDormSelected(true);
        setIsFloorSelected(false);
        setIsRoomSelected(false);
        setFloor('0');
        setRoom('0');
    };

    const onChangeFloor = (e) => {
        if (isDormSelected) {
            setFloor(e.target.value);
            setIsFloorSelected(true);
            setIsRoomSelected(false);
            setRoom('0');
        }
    };

    const onChangeRoom = (e) => {
        if (isFloorSelected) {
            setRoom(e.target.value);
            setIsRoomSelected(true);
        }
    };

    return (
        <div className={"form"}>
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
            <div>
                <label htmlFor="room">Номер комнаты </label>
                <select value={room} onChange={onChangeRoom} className={'select'}>
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
        </div>
    );
};

export default Form;