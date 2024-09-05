import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GetAllBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:8080/bookings'); // Replace with your API endpoint
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setError('Failed to fetch bookings. Please try again later.');
            }
        };

        fetchBookings();
    }, []);

    const handleUpdateClick = (bookingId) => {
        navigate(`/updatebooking/${bookingId}`);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>All Bookings</h2>
            {error && <p style={styles.error}>{error}</p>}
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <div style={styles.cardsContainer}>
                    {bookings.map((booking) => (
                        <div key={booking.bookingId} style={styles.card}>
                            <div style={styles.cardContent}>
                                <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
                                <p><strong>Check-in Date:</strong> {booking.checkInDate}</p>
                                <p><strong>Check-out Date:</strong> {booking.checkOutDate}</p>
                                <p><strong>Place ID:</strong> {booking.place ? booking.place.placeId : 'N/A'}</p>
                                <p><strong>User ID:</strong> {booking.user ? booking.user.userId : 'N/A'}</p>
                            </div>
                            <button onClick={() => handleUpdateClick(booking.bookingId)} style={styles.button}>
                                Update
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
        
        background: 'rgb(2,0,36)',
        background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,220,255,1) 0%, rgba(37,9,121,1) 50%, rgba(0,241,255,1) 100%)',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        margin: '50px auto',
    },
    heading: {
        fontSize: '2rem',
        color: '#333',
        marginBottom: '20px',
    },
    error: {
        color: 'red',
    },
    cardsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        width: '100%',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    cardContent: {
        marginBottom: '10px',
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007BFF',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '16px',
        alignSelf: 'flex-start',
    },
};

export default GetAllBookings;
