// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    

    return (
        <div>
            <h1>Welcome to Holiday home Booking Application</h1>
           
                <nav>
                    <Link to="/login">Login</Link>
                    <br />
                    <Link to="/registration">Registration</Link>
                </nav>
            
        </div>
    );
};

export default HomePage;
