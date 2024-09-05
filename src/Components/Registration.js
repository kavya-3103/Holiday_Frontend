import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        let validationErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!username) validationErrors.username = 'Username is required';
        if (!email) validationErrors.email = 'Email is required';
        else if (!emailRegex.test(email)) validationErrors.email = 'Email is invalid';
        if (!password) validationErrors.password = 'Password is required';
        else if (password.length < 6) validationErrors.password = 'Password must be at least 6 characters long';
        if (!role) validationErrors.role = 'Role is required';

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await axios.post('http://localhost:8080/users', { username, email, password, role });
            alert('Registration successful!');
            navigate('/login');
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.form}>
                <h2 style={styles.heading}>Enter your Details</h2>
                <label style={styles.label}>
                    Username:
                </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    style={styles.input}
                />
                {errors.username && <p style={styles.error}>{errors.username}</p>}

                <label style={styles.label}>
                    Email:
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    style={styles.input}
                />
                {errors.email && <p style={styles.error}>{errors.email}</p>}

                <label style={styles.label}>
                    Password:
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    style={styles.input}
                />
                {errors.password && <p style={styles.error}>{errors.password}</p>}

                <label style={styles.label}>
                    Role:
                </label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={styles.input}
                >
                    <option value="">Select role</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
                {errors.role && <p style={styles.error}>{errors.role}</p>}

                <button onClick={handleRegister} style={styles.button}>
                    Register
                </button>
            </div>
        </div>
    );
};

// Inline styles at the bottom
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'rgb(2,0,36)',
        background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 46%, rgba(0,212,255,1) 100%)',
    },
    form: {
        width: '100%',
        maxWidth: '400px',
        padding: '30px',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.7)',
        boxSizing: 'border-box',
    },
    heading: {
        fontSize: '2rem',
        marginBottom: '20px',
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontSize: '0.9rem',
        color: '#555',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '1rem',
        marginBottom: '6px',
    },
    error: {
        color: 'red',
        fontSize: '0.8rem',
        marginBottom: '10px',
    },
    button: {
        width: '100%',
        padding: '10px',
        background: 'rgb(2,0,36)',
        background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) 0%, rgba(9,9,121,1) 56%, rgba(9,9,121,1) 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        cursor: 'pointer',
    },
};

export default Registration;
