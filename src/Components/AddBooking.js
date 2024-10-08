import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AddBooking = () => {
    const [bookingDate, setBookingDate] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [numAdults, setNumAdults] = useState(1);
    const [numChildren, setNumChildren] = useState(0);
    const [numRooms, setNumRooms] = useState(1);
    const [roomType, setRoomType] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    // Extract placeId from the URL query parameters
    const placeId = new URLSearchParams(location.search).get('placeId');

    // Get the userId from local storage
    const userId = localStorage.getItem('userId');

    // Set the booking date to the current date
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setBookingDate(today);
    }, []);

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

        // Get today's date for validation
        const today = new Date().toISOString().split('T')[0];

        // Validate the booking date (it should not be in the past)
        if (new Date(bookingDate) < new Date(today)) {
            setError('Booking date cannot be in the past.');
            setLoading(false);
            return;
        }

        // Validate the check-in date (it should not be before the booking date)
        if (new Date(checkInDate) < new Date(bookingDate)) {
            setError('Check-in date cannot be before the booking date.');
            setLoading(false);
            return;
        }

        // Date validation: Check if check-out date is after check-in date
        if (new Date(checkOutDate) <= new Date(checkInDate)) {
            setError('Check-out date must be after the check-in date.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/bookings', {
                bookingDate,
                checkInDate,
                checkOutDate,
                numAdults,
                numChildren,
                numRooms,
                roomType,
                user: { userId },
                place: { placeId }
            });

            if (response.status === 200 || response.status === 201) { 
                // Save the new booking to localStorage
                const newBooking = {
                    id: response.data.id,  // Assuming the response contains the new booking ID
                    bookingDate,
                    checkInDate,
                    checkOutDate,
                    numAdults,
                    numChildren,
                    numRooms,
                    roomType,
                    userId,
                    placeId
                };
                
                // Retrieve existing bookings from localStorage
                const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
                
                // Add the new booking
                bookings.push(newBooking);
                
                // Save the updated bookings array back to localStorage
                localStorage.setItem('bookings', JSON.stringify(bookings));
                
                setSuccess(true);
                alert('Booking submitted successfully!');
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            } else {
                setError('Unexpected response status: ' + response.status);
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
            setError('Failed to submit booking. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Add Booking</h2>
            {error && <p style={styles.error}>{error}</p>}
            {success && <p style={styles.success}>Booking submitted successfully!</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Booking Date:</label>
                    <input
                        type="date"
                        value={bookingDate}
                        readOnly
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Check-in Date:</label>
                    <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Check-out Date:</label>
                    <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Number of Adults:</label>
                    <input
                        type="number"
                        value={numAdults}
                        onChange={(e) => setNumAdults(e.target.value)}
                        min="1"
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Number of Children:</label>
                    <input
                        type="number"
                        value={numChildren}
                        onChange={(e) => setNumChildren(e.target.value)}
                        min="0"
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Number of Rooms:</label>
                    <input
                        type="number"
                        value={numRooms}
                        onChange={(e) => setNumRooms(e.target.value)}
                        min="1"
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Room Type:</label>
                    <select
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        required
                        style={styles.select}
                    >
                        <option value="">Select Room Type</option>
                        <option value="Single">Single</option>
                        <option value="Double">Double</option>
                        <option value="Suite">Suite</option>
                    </select>
                </div>
                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? 'Submitting...' : 'Submit Booking'}
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
    select: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
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
    error: {
        color: 'red',
    },
    success: {
        color: 'green',
    },
};

export default AddBooking;
