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
        <div>
            <h2>All Feedbacks</h2>
            {loading && <p>Loading feedbacks...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {feedbacks.length > 0 ? (
                <ul>
                    {feedbacks.map((feedback) => (
                        <li key={feedback.feedbackId} style={{ marginBottom: '20px' }}>
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

export default GetAllFeedbacks;
