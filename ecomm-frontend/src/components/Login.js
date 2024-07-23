// src/pages/Login.js
import React, { useState } from 'react';
import { useAuth } from '../utils/useAuth';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="login__wrapper">
                    <div className="form-group">
                        <label for="uemail"><b>Email</b></label>
                        <input
                            id='uemail' 
                            type="email"
                            value={email}
                            className='form-control'
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"/>
                    </div>

                    <div className="form-group">
                        <label for="psw"><b>Password</b></label>
                        <input 
                            id='psw'
                            type="password"
                            value={password}
                            className='form-control'
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                        
                    <button type="submit" className='btn btn-primary'>Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
