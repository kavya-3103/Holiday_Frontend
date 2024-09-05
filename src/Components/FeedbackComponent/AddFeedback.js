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

    const validateForm = () => {
        if (!rating || rating < 1 || rating > 5) {
            setError('Please provide a rating between 1 and 5.');
            return false;
        }
        if (comment.trim().length < 10) {
            setError('Comment must be at least 10 characters long.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (!validateForm()) return;

        if (!userId) {
            setError('User not logged in. Please log in and try again.');
            return;
        }

        setLoading(true);
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
        <div style={styles.container}>
            <h2 style={styles.heading}>Add Feedback for Place {placeId}</h2>
            {error && <p style={styles.error}>{error}</p>}
            {success && <p style={styles.success}>Feedback submitted successfully!</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Rating:</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Comment:</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        style={styles.textarea}
                    />
                </div>
                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? 'Submitting...' : 'Submit Feedback'}
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        fontSize: '2rem',
        marginBottom: '20px',
        color: '#333',
    },
    error: {
        color: 'red',
        fontWeight: 'bold',
    },
    success: {
        color: 'green',
        fontWeight: 'bold',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    textarea: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        minHeight: '100px',
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007BFF',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default AddFeedback;
