import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to fetch users.');
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/users/${userId}`);
                setUsers(users.filter(user => user.userId !== userId));
                alert('User deleted successfully.');
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user.');
            }
        }
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.container}>
                <h2 style={styles.heading}>Users List</h2>
                {error && <p style={styles.error}>{error}</p>}
                {users.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.tableHeader}>
                                <th style={styles.tableCell}>ID</th>
                                <th style={styles.tableCell}>Username</th>
                                <th style={styles.tableCell}>Email</th>
                                <th style={styles.tableCell}>Password</th>
                                <th style={styles.tableCell}>Role</th>
                                <th style={styles.tableCell}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.userId} style={styles.tableRow}>
                                    <td style={styles.tableCell}>{user.userId}</td>
                                    <td style={styles.tableCell}>{user.username}</td>
                                    <td style={styles.tableCell}>{user.email}</td>
                                    <td style={styles.tableCell}>{user.password}</td>
                                    <td style={styles.tableCell}>{user.role}</td>
                                    <td style={styles.tableCell}>
                                        <button
                                            style={styles.deleteButton}
                                            onClick={() => handleDelete(user.userId)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        minHeight: '100vh',
        backgroundColor: 'lightblue', // Background color for the entire page
        padding: '40px 0',
    },
    container: {
        padding: '20px',
        backgroundColor: '#f4f4f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '1000px',
        margin: 'auto',
    },
    heading: {
        fontSize: '2rem',
        color: '#333',
        marginBottom: '20px',
        textAlign: 'center',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#fff',
    },
    tableHeader: {
        backgroundColor: '#007BFF',
        color: '#fff',
        textAlign: 'left',
    },
    tableRow: {
        borderBottom: '1px solid #ddd',
    },
    tableCell: {
        padding: '12px',
        textAlign: 'left',
    },
    deleteButton: {
        backgroundColor: '#FF0000',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default GetUsers;
