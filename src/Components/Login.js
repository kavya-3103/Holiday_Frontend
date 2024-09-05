import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/users/login', null, {
                params: {
                    username,
                    password,
                    role
                }
            });

            if (response.status === 200) {
                // Assuming response.data contains userId and role
                const { userId, role } = response.data;

                // Store username, role, and userId in localStorage
                localStorage.setItem('username', username);
                localStorage.setItem('role', role);
                localStorage.setItem('userId', userId);

                // Navigate based on role
                if (role === 'Admin') {
                    navigate('/adminhome');
                } else {
                    navigate('/home');
                }
            }
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Login</h2>
            <form style={styles.form} onSubmit={handleLogin}>
                <div style={styles.field}>
                    <label style={styles.label}>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Role:</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                        style={styles.input}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" style={styles.button}>Login</button>
            </form>
            <p style={styles.registerLink}>
                Not registered? <span onClick={() => navigate('/registration')} style={styles.link}>Click here</span> to sign up.
            </p>
        </div>
    );
};

// Inline styles
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
    title: {
        fontSize: '2rem',
        marginBottom: '20px',
        color: 'white',
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
    field: {
        marginBottom: '15px',
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
    registerLink: {
        marginTop: '20px',
        fontSize: '0.9rem',
        color: '#fff',
    },
    link: {
        color: '#ffeb3b',
        cursor: 'pointer',
        textDecoration: 'underline',
    }
};

export default Login;
