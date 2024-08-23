import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const GetFeedbackById = () => {
    const [feedback, setFeedback] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const placeId = queryParams.get('placeId');

    useEffect(() => {
        const fetchFeedback = async () => {
            if (!placeId) return;

            setLoading(true);
            setError('');
            setFeedback(null);

            try {
                const response = await axios.get(`http://localhost:8080/feedbacks/place/${placeId}`);
                if (response.status === 200) {
                    setFeedback(response.data);
                } else {
                    setError(`Unexpected response status: ${response.status}`);
                }
            } catch (err) {
                console.error('Error fetching feedback:', err);
                if (err.response) {
                    setError(`Error: ${err.response.data.message || err.response.statusText}`);
                } else if (err.request) {
                    setError('No response received from server.');
                } else {
                    setError(`Error: ${err.message}`);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchFeedback();
    }, [placeId]);

    return (
        <div>
            <h2>Feedback for Place ID: {placeId}</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {feedback && (
                <div>
                    <h3>Feedback Details</h3>
                    <p><strong>Rating:</strong> {feedback.rating}</p>
                    <p><strong>Comment:</strong> {feedback.comment}</p>
                    <p><strong>User ID:</strong> {feedback.user.userId}</p>
                    <p><strong>Place ID:</strong> {feedback.place.placeId}</p>
                </div>
            )}
        </div>
    );
};

export default GetFeedbackById;
