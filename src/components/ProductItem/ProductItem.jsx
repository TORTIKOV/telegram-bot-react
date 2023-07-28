// ProductItem.js

import React, { useState } from 'react';
import Button from '../Button/Button';
import './ProductItem.css';
// Import your product images
import ozonImage from '../../images/image11.jpg';
import wbImage from '../../images/image11.jpg';
import lentaImage from '../../images/image11.jpg';
import andreikaImage from '../../images/image11.jpg';

const ProductItem = ({ product, className, onAdd, isSelected, isClickable }) => {
  const [clickCount, setClickCount] = useState(0);

  const onAddHandler = () => {
    if (isClickable) {
      onAdd(product);
      setClickCount((prevCount) => prevCount + 1);
    }
  };

  // Map product IDs to corresponding images
  const getProductImage = (productId) => {
    switch (productId) {
      case 1:
        return ozonImage;
      case 2:
        return wbImage;
      case 3:
        return lentaImage;
      case 4:
        return andreikaImage;
      default:
        return null; // If no image is available for the product
    }
  };

  return (
    <div className={`product ${isSelected ? 'selected-item' : ''} ${className}`}>
      <div className={'img'}>
        <img src={getProductImage(product.id)} alt={product.title} />
      </div>

      <Button
        className={'add-btn'}
        onClick={onAddHandler}
        style={{
          backgroundColor:
            clickCount % 2 === 0
              ? 'var(--tg-theme-button-color)'
              : 'var(--tg-theme-secondary-bg-color)',
        }}
      >
        {clickCount % 2 === 0 ? 'Заказать' : 'Выбрано'}
      </Button>
    </div>
  );
};

export default ProductItem;
