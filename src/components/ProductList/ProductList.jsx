import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';
import image1 from '../../images/image11.jpg';

const ProductList = () => {
    const [order, setOrder] = useState([]);

    // Sample data for picture buttons
    const products = [
        { id: 1, name: 'Ozon', image: image1 },  // Use the imported image1
        { id: 2, name: 'WB', image: image1 },    // Use the imported image1
        { id: 3, name: 'Lenta', image: image1 }, // Use the imported image1
        { id: 4, name: 'Andreyka', image: image1 } // Use the imported image1
        // Add more products as needed
    ];

    const handleAddToOrder = (product) => {
        setOrder([...order, product]);
    };

    return (
        <div className="product-list">
            {products.map((product) => (
                <div key={product.id} className="product-button">
                    <img src={product.image} alt={product.name} />
                    <span>{product.name}</span>
                    <button onClick={() => handleAddToOrder(product)}>Add to Order</button>
                </div>
            ))}
            <Link to="/order">
                <button>Make an Order</button>
            </Link>
        </div>
    );
};

export default ProductList;
