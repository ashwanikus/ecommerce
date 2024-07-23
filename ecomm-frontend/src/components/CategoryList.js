// src/components/CategoryList.js
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryList = ({ categories }) => {
    return (
        <div className='category__wrapper'>
            {categories.map(category => (
                    <div className="card" key={category._id}>
                        <img className="card-img-top" src={category.image} alt="Card" />
                        <div className="card-body">
                            <h4 className="card-title">{category.name}</h4>
                            <p className="card-text">{category.description}</p>
                            <Link to={`/products/${category._id}`} className="btn btn-primary">See products</Link>
                        </div>
                    </div>
            ))}
        </div>
    );
};

export default CategoryList;
