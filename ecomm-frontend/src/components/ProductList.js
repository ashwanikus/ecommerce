// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import { useCart } from '../utils/useCart';

const ProductList = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if(id){
                    const response = await api.get(`/products/${id}`);
                    setProducts(response.data);
                }else{
                    const response = await api.get(`/products`);
                    setProducts(response.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [id]);
    

    return (
        <div className='product__wrapper'>
            {products.map(product => (
                <div className="card" key={product._id}>
                    <img className="card-img-top" src={product.imageURL} alt="product"/>
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description}</p>
                        <button className="btn btn-primary" onClick={() => addToCart(product, 1)}>Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
