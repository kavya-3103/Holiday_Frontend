import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AddBooking = () => {
    const [bookingDate, setBookingDate] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [status, setStatus] = useState('Confirmed');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    // Extract placeId from the URL query parameters
    const placeId = new URLSearchParams(location.search).get('placeId');

    // Get the userId from local storage
    const userId = localStorage.getItem('userId');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!userId) {
            setError('User not logged in. Please log in and try again.');
            setLoading(false);
            return;
        }

        if (!placeId) {
            setError('Place ID is missing.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/bookings', {
                bookingDate,
                checkInDate,
                checkOutDate,
                status,
                user: { userId },
                place: { placeId }
            });

            if (response.status === 200 || response.status === 201) { // Accept both 200 and 201 status codes
                setSuccess(true);
                alert('Booking submitted successfully!');
                setTimeout(() => {
                    navigate('/usergetallplaces');
                }, 2000);
            } else {
                setError('Unexpected response status: ' + response.status);
            }
        } catch (error) {
            console.error('Error submitting booking:', {
                message: error.message,
                response: error.response,
                request: error.request
            });
            setError('Failed to submit booking. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Add Booking</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Booking submitted successfully!</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Booking Date:</label>
                    <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Check-in Date:</label>
                    <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Check-out Date:</label>
                    <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Booking'}
                </button>
            </form>
        </div>
    );
};

export default AddBooking;
