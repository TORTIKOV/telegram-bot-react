import React from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';
import image1 from '../../images/image11.jpg';

const ProductList = () => {
    // Sample data for picture buttons
    const products = [
        { id: 1, name: 'Ozon', image: image1 },  // Use the imported image1
        { id: 2, name: 'WB', image: image1 },    // Use the imported image1
        { id: 3, name: 'Lenta', image: image1 }, // Use the imported image1
        { id: 4, name: 'Andreyka', image: image1 } // Use the imported image1
        // Add more products as needed
    ];
    return (
        <div className="product-list">
            {products.map((product) => (
                <Link to={`/${product.id}`} key={product.id}>
                    <div className="product-button">
                        <img src={product.image} alt={product.name} />
                        <span>{product.name}</span>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ProductList;
