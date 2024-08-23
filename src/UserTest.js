import React, { useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/users'; // Replace with your backend URL

const UserTest = () => {
    useEffect(() => {
        // Test GET all users
        axios.get(API_URL)
            .then(response => {
                console.log('GET all users:', response.data);
            })
            .catch(error => {
                console.error('Error fetching all users:', error);
            });

        // Test POST a new user
        const newUser = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            role: 'User'
        };
        axios.post(API_URL, newUser)
            .then(response => {
                console.log('POST new user:', response.data);
            })
            .catch(error => {
                console.error('Error creating new user:', error);
            });

        // Test PUT (update) a user (use a valid user ID)
        const userIdToUpdate = 2; // Replace with a valid user ID
        const updatedUser = {
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            password: 'newpassword123',
            role: 'User'
        };
        axios.put(`${API_URL}/${userIdToUpdate}`, updatedUser)
            .then(response => {
                console.log('PUT update user:', response.data);
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });

        // Test DELETE a user (use a valid user ID)
        const userIdToDelete = 2; // Replace with a valid user ID
        axios.delete(`${API_URL}/${userIdToDelete}`)
            .then(response => {
                console.log('DELETE user:', response.status);
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    }, []);

    return null; // No UI required, just console logs
};

export default UserTest;
