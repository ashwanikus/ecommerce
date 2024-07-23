// src/components/Cart.js
import React from 'react';
import { useCart} from '../utils/useCart';

const Cart = () => {
    const { cart, removeFromCart, placeCart } = useCart();

    return (
        <>
        <div className='cart__wrapper'>
        {cart.map(item => (
            <div className="card" key={item._id}>
            <img className="card-img-top" src={item.imageURL} alt="product"/>
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.quantity} * {item.price} = {item.quantity * item.price}</p>
                <button className="btn btn-danger" onClick={() => removeFromCart(item._id, 1)}>Remove</button>
            </div>
        </div>
        ))}
        </div>
        <button className='btn btn-primary' onClick={() => placeCart()}> Place order</button>
        </>
    );
};

export default Cart;
