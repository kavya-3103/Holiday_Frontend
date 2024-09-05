import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [places, setPlaces] = useState({});
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId');

    // Fetch bookings once when the component mounts or when userId changes
    useEffect(() => {
        const fetchBookings = () => {
            try {
                // Retrieve bookings from localStorage
                const allBookings = JSON.parse(localStorage.getItem('bookings')) || [];

                // Filter bookings by the logged-in user's ID
                const userBookings = allBookings.filter(booking => booking.userId === userId);

                // Verify that each booking has the expected properties
                const validBookings = userBookings.filter(booking => booking && booking.placeId);

                setBookings(validBookings);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setError('Failed to fetch bookings. Please try again later.');
            }
        };

        fetchBookings();
    }, [userId]);

    // Fetch place names whenever bookings are updated
    useEffect(() => {
        const uniquePlaceIds = [...new Set(bookings.map(booking => booking.placeId))];

        uniquePlaceIds.forEach(placeId => {
            if (!places[placeId]) { // Fetch only if not already fetched
                fetchPlaceName(placeId);
            }
        });
    }, [bookings]); // Depend on bookings only

    // Function to fetch place name based on placeId
    const fetchPlaceName = async (placeId) => {
        try {
            console.log(`Fetching place name for placeId: ${placeId}`);
            const response = await axios.get(`http://localhost:8080/places/${placeId}`);
            console.log('API response:', response.data);

            // Use 'name' field from response as per your Place entity
            setPlaces(prevPlaces => ({
                ...prevPlaces,
                [placeId]: response.data.name || 'Unknown Place'
            }));
        } catch (error) {
            console.error('Error fetching place name:', error);
            setPlaces(prevPlaces => ({
                ...prevPlaces,
                [placeId]: 'Unknown Place'
            }));
        }
    };

    if (error) {
        return <p style={styles.error}>{error}</p>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>My Bookings</h2>
            {bookings.length === 0 ? (
                <p style={styles.noBookings}>No bookings found.</p>
            ) : (
                <ul style={styles.bookingList}>
                    {bookings.map((booking, index) => (
                        <li key={index} style={styles.bookingItem}>
                            <div><strong>Place Name:</strong> {places[booking.placeId] || 'Loading...'}</div>
                            <div><strong>Check-in Date:</strong> {booking.checkInDate}</div>
                            <div><strong>Check-out Date:</strong> {booking.checkOutDate}</div>
                            <div><strong>Number of Adults:</strong> {booking.numAdults || 'N/A'}</div>
                            <div><strong>Number of Children:</strong> {booking.numChildren || 'N/A'}</div>
                            <div><strong>Number of Rooms:</strong> {booking.numRooms || 'N/A'}</div>
                            <div><strong>Room Type:</strong> {booking.roomType || 'N/A'}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        margin: '20px auto',
        width: '90%',
        maxWidth: '800px',
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
    noBookings: {
        textAlign: 'center',
        color: '#666',
    },
    bookingList: {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
    },
    bookingItem: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
        marginBottom: '10px',
    },
};

export default MyBooking;
