// src/pages/Register.js
import React, { useState } from 'react';
import { useAuth } from '../utils/useAuth';
import { toast } from 'react-toastify';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {register} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await register(name, username, email, password);
        console.log(res);
        if(res.data){
            setName('');
            setEmail('');
            setUsername('');
            setPassword('');
            toast.success("Success Notification !", {
                position: "top-center"
            });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='register__wrapper'>
                    <div className='form-group'>
                        <label htmlFor='uname'>Name</label>
                        <input
                            id='uname'
                            type="text"
                            className='form-control'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='username'>Username</label>
                        <input
                            id='username'
                            type="text"
                            className='form-control'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            id='email'
                            type="email"
                            className='form-control'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />    
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type="password"
                            id='password'
                            className='form-control'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit" className='btn btn-primary'>Register</button>
                </div>   
            </form>
        </div>
    );
};

export default Register;
