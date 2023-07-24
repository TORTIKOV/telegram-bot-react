import React from 'react';
import './Button.css';
export default Button;

const Button = (props) => {
    return (
        <button {...props} className={'button ' + props.className}/>
    );
};