import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { useAuth } from './utils/useAuth';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { useCart } from './utils/useCart';

function App() {
    const { user, logout } = useAuth();
    const token = localStorage.getItem('token');
    const { cart } = useCart();

    return (
        <Router>
            <div className="container">
                <header>
                    <nav>
                        <Link to="/">Home</Link>
                        {token ? (
                            <>
                                <Link to="/cart">Cart ({cart.length})</Link>
                                <button onClick={logout}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </>
                        )}
                    </nav>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/products/:id" element={<ProductList />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
