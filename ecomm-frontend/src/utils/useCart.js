// src/hooks/useCart.js
import { useState, useEffect } from 'react';
import api from './api';

export const useCart = () => {
    const [cart, setCart] = useState([]);
    const userId = localStorage.getItem('userid');

    useEffect( () => {
        const fetchData = async () => {
            try {
                const { data } = await api.get('/cart', { userId });
                setCart(data[0].products);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [userId]);

    const addToCart = async (product, quantity) => {
        const productIndex = cart.findIndex(item => item._id === product._id);
    
        if (productIndex !== -1) {
            // Product already in cart, update quantity
            const updatedCart = cart.map((item, index) => 
                index === productIndex ? { ...item, quantity: item.quantity + quantity } : item
            );
            setCart(updatedCart);
            await api.post('/cart', { userId, cartItems: updatedCart });
        } else {
            // Product not in cart, add it
            const updatedCart = [...cart, { ...product, quantity }];
            setCart(updatedCart);
            await api.post('/cart', { userId, cartItems: updatedCart });
        }
    };

    const removeFromCart = async (productId, quantity) => {
        const productIndex = cart.findIndex(item => item._id === productId);
        if (productIndex !== -1) {
            // Product already in cart, update quantity
            const updatedCart = cart.map(function(item, index) {
                if(index === productIndex && item.quantity > 0){
                    item.quantity = item.quantity - quantity;    
                    return item;
                } else {
                    return item;
                }
            }).filter(item => item.quantity > 0);
            setCart(updatedCart); 
            await api.post('/cart', { userId, cartItems: updatedCart });
        }
    };

    const placeCart = async () => {
        try {
            const response = await api.post('/order', { userId , items: cart});
            console.log('Order placed:', response.data);
            setCart([]);
        } catch (error) {
            console.error('Error placing order:', error.response.data);
        }
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    return { cart, addToCart, removeFromCart, clearCart , placeCart};
};
