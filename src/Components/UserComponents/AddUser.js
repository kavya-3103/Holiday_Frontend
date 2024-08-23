import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User'); // Default role
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            name: name,
            email: email,
            password: password,
            role: role
        };

        try {
            const response = await axios.post('http://localhost:8080/users', userData);
            console.log('User added:', response.data);
            setResponseMessage('User added successfully');
        } catch (error) {
            console.error('Error adding user:', error);
            setResponseMessage('Failed to add user');
        }
    };

    return (
        <div>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Role:
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                            <option value="Owner">Owner</option>
                        </select>
                    </label>
                </div>
                <button type="submit">Add User</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default AddUser;
