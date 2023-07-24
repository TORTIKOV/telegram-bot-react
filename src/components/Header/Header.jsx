import React from 'react';
import Button from '../Button/Button';
import {useTelegram} from "../../hooks/useTelegram";

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