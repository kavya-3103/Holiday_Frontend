import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateUserById = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Add password state
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get the user ID from local storage
        const userId = localStorage.getItem('userId');

        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/users/${userId}`);
                setUser(response.data);
                setUsername(response.data.username);
                setEmail(response.data.email);
                // Do not set the password; it should be entered by the user
            } catch (error) {
                console.error('Error fetching user details:', error);
                setError('Failed to fetch user details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUser();
        } else {
            setError('User ID is missing. Please log in again.');
            setLoading(false);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('userId');
            const updatedUser = {
                username,
                email,
                // Only include password if it's not empty
                ...(password && { password }),
            };

            await axios.put(`http://localhost:8080/users/${userId}`, updatedUser);
            alert('User updated successfully!');
            navigate('/home'); // Navigate to home or another relevant page
        } catch (error) {
            console.error('Error updating user:', error);
            setError('Failed to update user. Please try again later.');
        }
    };

    if (loading) return <p>Loading...</p>;

    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div style={styles.MainContainer}>
        <div style={styles.container}>
            <h2 style={styles.heading}>Update Your Information</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Leave empty if not changing"
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Update</button>
            </form>
        </div>
        </div>
        
    );
};

const styles = {
    MainContainer:{
        width:'100%',
        height:'100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgb(2,0,36)',
background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,220,255,1) 0%, rgba(37,9,121,1) 50%, rgba(0,241,255,1) 100%)'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#f4f4f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: 'auto',
    },
    heading: {
        fontSize: '2rem',
        color: '#250979',
        marginBottom: '20px',
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '16px',
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        background: 'rgb(2,0,36)',
background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(37,9,121,1) 0%, rgba(0,220,255,1) 50%, rgba(37,9,121,1) 100%)',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default UpdateUserById;
