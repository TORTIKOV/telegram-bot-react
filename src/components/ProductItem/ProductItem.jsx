import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import './ProductItem.css';
// Import your product images
import ozonImage from '../../images/ozon_logo.png';
import wbImage from '../../images/wildberries_logo.png';
import lentaImage from '../../images/lenta_logo.png';
import andreikaImage from '../../images/andreyka_logo.png';
import pharmacyImage from '../../images/pharma_logo.png'; // New image
import vapeImage from '../../images/vape_logo.png';
import otherImage from '../../images/others_logo.png'; 

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
        return vapeImage;    
      case 7:
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

      <div className={'product-title'}>
        {/* Display the name of the product based on its ID */}
        {product.id === 1 && 'Ozon'}
        {product.id === 2 && 'Wildberries'}
        {product.id === 3 && 'Лента'}
        {product.id === 4 && 'Андрейка'}
        {product.id === 5 && 'Аптека'}
        {product.id === 6 && 'ПункВейп'}
        {product.id === 7 && 'Другое'}
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
