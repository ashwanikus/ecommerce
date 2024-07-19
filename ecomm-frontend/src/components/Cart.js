// src/components/Cart.js
import React from 'react';
import { useCart } from '../utils/useCart';

const Cart = () => {
    const { cart, removeFromCart } = useCart();

    return (
        <div>
            <h2>Shopping Cart</h2>
            <ul>
                {cart.map(item => (
                    <li key={item._id}>
                        <h3>{item.name}</h3>
                        <p>Quantity: {item.quantity}</p>
                        <button onClick={() => removeFromCart(item._id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;
