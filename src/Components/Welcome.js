import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start', // Align items to the start (left side)
            paddingLeft: '10%', // Adds space from the left edge
            height: '100vh',
            margin: 0,
            overflow: 'hidden',
            backgroundImage: 'url(/asset/bg_img2.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            textAlign: 'center',
            color: '#fff',
            boxSizing: 'border-box',
        },
        heading: {
            fontSize: '2.5rem',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        },
        linkContainer: {
            marginTop: '20px',
        },
        link: {
            display: 'block',
            margin: '10px 0',
            padding: '10px 20px',
            backgroundColor: '#f8b400',
            color: '#000',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        },
        linkText: {
            fontSize: '1.2rem',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Welcome to Holiday Home Booking Application</h1>
            <nav style={styles.linkContainer}>
                <Link to="/login" style={styles.link}>
                    <span style={styles.linkText}> Click here to Login</span>
                </Link>
                <Link to="/registration" style={styles.link}>
                    <span style={styles.linkText}>New user? Click here to Register</span>
                </Link>
            </nav>
        </div>
    );
};

export default Welcome;
