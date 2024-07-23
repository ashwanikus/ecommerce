// src/hooks/useAuth.js
import { useState } from 'react';
import api from '../utils/api';

export const useAuth = () => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userid', response.data._id);
            setUser(response.data.user);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const register = async (name, username, email, password) => {
        try {
            const res = await api.post('/auth/register', { name, username, email, password });
            return res;
        } catch (error) {
            console.error('Registration error:', error);
            return error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        setUser(null);
    };

    return { user, login, register, logout };
};
