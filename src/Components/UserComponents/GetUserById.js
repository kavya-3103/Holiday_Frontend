import React, { useState } from 'react';
import axios from 'axios';

const GetUserById = () => {
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFetchUser = async () => {
        setLoading(true);
        setError(null);
        setUser(null);

        try {
            const response = await axios.get(`http://localhost:8080/users/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
            setError('Failed to fetch user.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Get User By ID</h2>
            <div>
                <label>
                    User ID:
                    <input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter user ID"
                    />
                </label>
                <button onClick={handleFetchUser} disabled={loading}>
                    {loading ? 'Loading...' : 'Fetch User'}
                </button>
            </div>
            {error && <p>{error}</p>}
            {user && (
                <div>
                    <h3>User Details</h3>
                    <p><strong>ID:</strong> {user.userId}</p>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </div>
            )}
        </div>
    );
};

export default GetUserById;
