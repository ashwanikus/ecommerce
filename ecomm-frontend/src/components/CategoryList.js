// src/components/CategoryList.js
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryList = ({ categories }) => {
    return (
        <div>
            <h2>Categories</h2>
            <ul>
                {categories.map(category => (
                    <li key={category._id}>
                        <Link to={`/products/${category._id}`}>{category.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
