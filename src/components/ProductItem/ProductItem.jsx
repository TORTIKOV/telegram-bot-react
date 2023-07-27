import React from 'react';
import Button from "../Button/Button";
import './ProductItem.css';

// Import your product images
import ozonImage from '../../images/image11.jpg';
import wbImage from '../../images/image11.jpg';
import lentaImage from '../../images/image11.jpg';
import andreikaImage from '../../images/image11.jpg';

const ProductItem = ({product, className, onAdd}) => {
    const onAddHandler = () => {
        onAdd(product);
    }

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
    }

    return (
        <div className={'product ' + className}>
            <div className={'img'}>
                <img src={getProductImage(product.id)} alt={product.title} />
            </div>
            <div className={'title'}>{product.title}</div>

            <Button className={'add-btn'} onClick={onAddHandler}>
                Заказать
            </Button>
        </div>
    );
};

export default ProductItem;
