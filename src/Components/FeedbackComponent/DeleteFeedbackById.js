import React, { useState } from 'react';
import axios from 'axios';

const DeleteFeedbackById = () => {
    const [feedbackId, setFeedbackId] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleDeleteFeedback = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await axios.delete(`http://localhost:8080/feedbacks/${feedbackId}`);
            setSuccess('Feedback deleted successfully.');
        } catch (error) {
            console.error('Error deleting feedback:', error);
            setError('Failed to delete feedback.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Delete Feedback By ID</h2>
            <div>
                <label>
                    Feedback ID:
                    <input
                        type="number"
                        value={feedbackId}
                        onChange={(e) => setFeedbackId(e.target.value)}
                        placeholder="Enter feedback ID"
                    />
                </label>
                <button onClick={handleDeleteFeedback} disabled={loading}>
                    {loading ? 'Deleting...' : 'Delete Feedback'}
                </button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default DeleteFeedbackById;
