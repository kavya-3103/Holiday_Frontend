import React, { useState } from 'react';
import axios from 'axios';

const DeleteUserById = () => {
    const [userId, setUserId] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleDeleteUser = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await axios.delete(`http://localhost:8080/users/${userId}`);
            setSuccess('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Failed to delete user.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Delete User By ID</h2>
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
                <button onClick={handleDeleteUser} disabled={loading}>
                    {loading ? 'Deleting...' : 'Delete User'}
                </button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default DeleteUserById;
