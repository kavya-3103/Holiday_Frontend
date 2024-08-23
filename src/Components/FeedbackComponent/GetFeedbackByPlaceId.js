import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GetFeedbackByPlaceId = () => {
    const { placeId } = useParams(); // Get the placeId from the route params
    const [feedbacks, setFeedbacks] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            setLoading(true);
            setError('');
            setFeedbacks([]);

            try {
                const response = await axios.get(`http://localhost:8080/feedbacks/place/${placeId}`);
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
    }, [placeId]); // Fetch feedbacks when placeId changes

    return (
        <div>
            <h2>Feedback for Place ID: {placeId}</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {feedbacks.length > 0 ? (
                <ul>
                    {feedbacks.map(feedback => (
                        <li key={feedback.feedbackId}>
                            <p><strong>Rating:</strong> {feedback.rating}</p>
                            <p><strong>Comment:</strong> {feedback.comment}</p>
                            <p><strong>User ID:</strong> {feedback.user.userId}</p>
                            <p><strong>Place ID:</strong> {feedback.place.placeId}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No feedback found for this place.</p>
            )}
        </div>
    );
};

export default GetFeedbackByPlaceId;
