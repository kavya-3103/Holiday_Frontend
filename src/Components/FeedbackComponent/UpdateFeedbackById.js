import React, { useState } from 'react';
import axios from 'axios';

const UpdateFeedbackById = () => {
    const [feedbackId, setFeedbackId] = useState('');
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [userId, setUserId] = useState('');
    const [placeId, setPlaceId] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpdateFeedback = async () => {
        setLoading(true);
        setError(null);
        setMessage('');

        try {
            // Create feedback object with provided details
            const updatedFeedback = {
                rating: parseInt(rating),
                comment,
                user: { userId: parseInt(userId) },
                place: { placeId: parseInt(placeId) }
            };

            // Make PUT request to update feedback
            const response = await axios.put(`http://localhost:8080/feedbacks/${feedbackId}`, updatedFeedback);

            // Check if the update was successful
            if (response.status === 200) {
                setMessage('Feedback updated successfully!');
            } else {
                setError(`Unexpected response status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error updating feedback:', error);
            setError('Failed to update feedback. Please check the ID and details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Update Feedback By ID</h2>
            <div>
                <label>
                    Feedback ID:
                    <input
                        type="text"
                        value={feedbackId}
                        onChange={(e) => setFeedbackId(e.target.value)}
                        placeholder="Enter feedback ID"
                    />
                </label>
            </div>
            <div>
                <label>
                    Rating:
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        placeholder="Enter rating"
                    />
                </label>
            </div>
            <div>
                <label>
                    Comment:
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Enter comment"
                    />
                </label>
            </div>
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
            </div>
            <div>
                <label>
                    Place ID:
                    <input
                        type="number"
                        value={placeId}
                        onChange={(e) => setPlaceId(e.target.value)}
                        placeholder="Enter place ID"
                    />
                </label>
            </div>
            <button onClick={handleUpdateFeedback} disabled={loading}>
                {loading ? 'Updating...' : 'Update Feedback'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
    );
};

export default UpdateFeedbackById;
