import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AddFeedback = () => {
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    // Extract placeId from the URL query parameters
    const placeId = new URLSearchParams(location.search).get('placeId');

    // Get the userId from local storage
    const userId = localStorage.getItem('userId'); // Adjust based on how you store user data

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!userId) {
            setError('User not logged in. Please log in and try again.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/feedbacks', {
                rating,
                comment,
                user: { userId }, // User object containing userId
                place: { placeId } // Place object containing placeId
            });

            if (response.status === 201) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/usergetallplaces'); // Redirect back to the list of places after a successful submission
                }, 2000);
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            setError('Failed to submit feedback. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Add Feedback for Place {placeId}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Feedback submitted successfully!</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Rating:</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Comment:</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Feedback'}
                </button>
            </form>
        </div>
    );
};

export default AddFeedback;
