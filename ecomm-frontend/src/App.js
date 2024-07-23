import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { useAuth } from './utils/useAuth';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { useCart } from './utils/useCart';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';

function App() {
    const { logout } = useAuth();
    const token = localStorage.getItem('token');
    const { cart } = useCart();

    return (
        <Router>
                <header>
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                        {token ? ( 
                            <ul className="nav navbar-nav">
                                <li>
                                    <Link to="/" className='nav-link'>Home</Link>
                                </li>
                                <li>
                                    <Link to="/cart" className='nav-link'>Cart{cart.length>0 ? (`(${cart.length})`):('')}</Link>
                                </li>
                                <li>
                                    <Link className="nav-link" onClick={logout}>Logout</Link>
                                </li>
                            </ul>
                        ):( 
                        <ul className="nav navbar-nav">
                            <li>
                                <Link to="/login" className='nav-link'>Login</Link>
                            </li>
                            <li>
                                <Link to="/register" className='nav-link'>Register</Link>
                            </li>
                        </ul> )}
                        </div>
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
                    <ToastContainer/>
                </main>
        </Router>
    );
}

export default App;
