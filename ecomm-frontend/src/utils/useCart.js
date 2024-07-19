// src/hooks/useCart.js
import { useState, useEffect } from 'react';
import api from './api';

export const useCart = () => {
    const [cart, setCart] = useState([]);
    const userId = localStorage.getItem('userid');

    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await api.get('/cart', { userId });
                setCart(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const addToCart = async (product, quantity) => {
        const productIndex = cart.findIndex(item => item._id === product._id);
    
        if (productIndex !== -1) {
            // Product already in cart, update quantity
            const updatedCart = cart.map((item, index) => 
                index === productIndex ? { ...item, quantity: item.quantity + quantity } : item
            );
            setCart(updatedCart);
            const response = await api.post('/cart', { userId, updatedCart });
            console.log(response);
        } else {
            // Product not in cart, add it
            const updatedCart = [...cart, { ...product, quantity }];
            setCart(updatedCart);
            const response = await api.post('/cart', { userId, updatedCart });
        }
    };

    const removeFromCart = (productId) => {
        console.log(productId);
        const updatedCart = cart.filter(item => item._id !== productId);
        console.log(updatedCart);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    return { cart, addToCart, removeFromCart, clearCart };
};
