import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateUserById = () => {
    const [user, setUser] = useState({ username: '', email: '', password: '', role: 'User' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('id');

    useEffect(() => {
        if (userId) {
            fetchUser(userId);
        }
    }, [userId]);

    const fetchUser = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:8080/users/${id}`);
            if (response.data) {
                setUser(response.data);
            } else {
                setError('User not found.');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            setError('Failed to fetch user.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateUser = async () => {
        setLoading(true);
        setError(null);

        console.log('Updating user with data:', user);  // Log the user object being sent

        try {
            const response = await axios.put(`http://localhost:8080/users/${userId}`, user);
            console.log('User updated:', response.data);
            window.alert('Update successful');  // Show alert
            navigate('/getusers'); // Navigate to the users list page after the alert
        } catch (error) {
            console.error('Error updating user:', error.response?.data || error.message);
            setError('Failed to update user.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Update User</h2>
            <div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {user && (
                    <div>
                        <div>
                            <label>
                                Username:
                                <input
                                    type="text"
                                    value={user.username}
                                    onChange={(e) => setUser((prev) => ({ ...prev, username: e.target.value }))}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    value={user.email}
                                    onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Password:
                                <input
                                    type="password"
                                    value={user.password}
                                    onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Role:
                                <select
                                    value={user.role}
                                    onChange={(e) => setUser((prev) => ({ ...prev, role: e.target.value }))}
                                >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Owner">Owner</option>
                                </select>
                            </label>
                        </div>
                        <button onClick={handleUpdateUser} disabled={loading}>
                            {loading ? 'Updating...' : 'Update User'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdateUserById;
