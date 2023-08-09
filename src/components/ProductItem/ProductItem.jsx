import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import './ProductItem.css';
// Import your product images
import ozonImage from '../../images/image11.jpg';
import wbImage from '../../images/image11.jpg';
import lentaImage from '../../images/image11.jpg';
import andreikaImage from '../../images/image11.jpg';
import pharmacyImage from '../../images/image11.jpg'; // New image
import otherImage from '../../images/image11.jpg'; 

const ProductItem = ({ product, className, onAdd, isSelected, isClickable }) => {
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    // Whenever the `isClickable` prop changes, reset the click count to 0
    setClickCount(0);
  }, [isClickable]);

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
      case 5:
        return pharmacyImage; // New image
      case 6:
        return otherImage;    // New image
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
