import React from 'react';
import Button from "..//Button/Button.jsx";
import {useTelegram} from "../../hooks/useTelegram.js";
import './Header.css';
export default Header;


const Header = () => {
    const {user, onClose} = useTelegram();

    return (
        <div className={'header'}>
            <Button onClick={onClose}>Close Dat Shit</Button>
            <span className={'username'}>
                {user?.username}
            </span>
        </div>

    ); 
};