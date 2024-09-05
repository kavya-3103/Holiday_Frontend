import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetAllFeedbacks = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            setError('');
            try {
                const response = await axios.get('http://localhost:8080/feedbacks');
                if (response.status === 200) {
                    setFeedbacks(response.data);
                } else {
                    setError(`Unexpected response status: ${response.status}`);
                }
            } catch (err) {
                console.error('Error fetching feedbacks:', err);
                if (err.response) {
                    // Server responded with a status other than 2xx
                    setError(`Error: ${err.response.data.message || err.response.statusText}`);
                } else if (err.request) {
                    // Request was made but no response received
                    setError('No response received from server.');
                } else {
                    // Something else went wrong
                    setError(`Error: ${err.message}`);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>All Feedbacks</h2>
            {loading && <p style={styles.loading}>Loading feedbacks...</p>}
            {error && <p style={styles.error}>{error}</p>}
            {feedbacks.length > 0 ? (
                <ul style={styles.list}>
                    {feedbacks.map((feedback) => (
                        <li key={feedback.feedbackId} style={styles.listItem}>
                            <p><strong>Rating:</strong> {feedback.rating}</p>
                            <p><strong>Comment:</strong> {feedback.comment}</p>
                            <p><strong>User ID:</strong> {feedback.user ? feedback.user.userId : 'N/A'}</p>
                            <p><strong>Place ID:</strong> {feedback.place ? feedback.place.placeId : 'N/A'}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No feedbacks available.</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '50px auto', // Add margin to keep the container away from the top edge
    },
    heading: {
        fontSize: '2rem',
        color: '#333',
        marginBottom: '20px',
    },
    loading: {
        color: '#007BFF',
    },
    error: {
        color: 'red',
    },
    list: {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
        width: '100%',
    },
    listItem: {
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginBottom: '10px',
        backgroundColor: 'lightgrey',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    },
};
document.body.style.backgroundColor = 'lightblue'; // Set the background color for the entire page

export default GetAllFeedbacks;
