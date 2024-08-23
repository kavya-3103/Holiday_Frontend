import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GetBookingsByUserId = () => {
    const { userId } = useParams(); // Get the userId from the route params
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            setError('');
            setBookings([]);

            try {
                const response = await axios.get(`http://localhost:8080/bookings/user/${userId}`);
                if (response.status === 200) {
                    if (response.data && response.data.length > 0) {
                        setBookings(response.data);
                    } else {
                        setError('No bookings found for this user.');
                    }
                } else {
                    setError(`Unexpected response status: ${response.status}`);
                }
            } catch (err) {
                console.error('Error fetching bookings:', err);
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

        fetchBookings();
    }, [userId]); // Fetch bookings when userId changes

    return (
        <div>
            <h2>Bookings for User ID: {userId}</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {bookings.length > 0 ? (
                <ul>
                    {bookings.map(booking => (
                        <li key={booking.bookingId}>
                            <p><strong>Booking ID:</strong> {booking.bookingId}</p>
                            <p><strong>Check-in Date:</strong> {booking.checkInDate}</p>
                            <p><strong>Check-out Date:</strong> {booking.checkOutDate}</p>
                            <p><strong>Status:</strong> {booking.status}</p>
                            <p><strong>User ID:</strong> {booking.user.userId}</p>
                            <p><strong>Place:</strong> {booking.place.placeName}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No booking details available.</p>
            )}
        </div>
    );
};

export default GetBookingsByUserId;
