import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [dorm, setDorm] = useState('');
    const [floor, setFloor] = useState('');
    const [room, setRoom] = useState('');

    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            name: name,
            phone: phone,
            dorm: dorm,
            floor: floor,
            room: room
        }
        tg.sendData(JSON.stringify(data));
    }, [name, phone, dorm, floor, room])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        if(!phone || !name) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [name, phone])

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChanhePhone = (e) => {
        setPhone(e.target.value)
    }

    const onChangeDorm = (e) => {
        setDorm(e.target.value)
    }

    const onChangeFloor = (e) => {
        setFloor(e.target.value)
    }
    const onChangeRoom = (e) => {
        setRoom(e.target.value)
    }

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
                onChange={onChanhePhone}
            />
            <div>
            <text>Номер общежития </text>
            <select value={dorm} onChange={onChangeDorm} className={'select'}>
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
            <text>Этаж </text>
            <select value={floor} onChange={onChangeFloor} className={'select'}>
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
            <text>Номер комнаты </text>
            <select value={room} onChange={onChangeRoom} className={'select'}>
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