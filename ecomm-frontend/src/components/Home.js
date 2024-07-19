// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import CategoryList from '../components/CategoryList';

const Home = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div>
            <h1>Home</h1>
            <CategoryList categories={categories} />
        </div>
    );
};

export default Home;
