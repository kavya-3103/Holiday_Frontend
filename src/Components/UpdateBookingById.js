import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBookingById = () => {
    const [booking, setBooking] = useState(null);
    const [bookingDate, setBookingDate] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [numAdults, setNumAdults] = useState(1);
    const [numChildren, setNumChildren] = useState(0);
    const [numRooms, setNumRooms] = useState(1);
    const [roomType, setRoomType] = useState('');
    const [status, setStatus] = useState('Confirmed');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            setError('Invalid booking ID.');
            return;
        }

        const fetchBooking = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/bookings/${id}`);
                const data = response.data;
                setBooking(data);
                setBookingDate(data.bookingDate);
                setCheckInDate(data.checkInDate);
                setCheckOutDate(data.checkOutDate);
                setNumAdults(data.numAdults);
                setNumChildren(data.numChildren);
                setNumRooms(data.numRooms);
                setRoomType(data.roomType);
                setStatus(data.status);
            } catch (error) {
                console.error('Error fetching booking:', error.response || error.message);
                setError(`Failed to fetch booking details: ${error.message}`);
            }
        };

        fetchBooking();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    
        // Get today's date for validation
        const today = new Date().toISOString().split('T')[0];
        console.log('Today\'s Date:', today);
        console.log('Booking Date:', bookingDate);
        console.log('Check-in Date:', checkInDate);
        console.log('Check-out Date:', checkOutDate);
    
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
    
        // Validate the check-out date (it should be after the check-in date)
        if (new Date(checkOutDate) <= new Date(checkInDate)) {
            setError('Check-out date must be after the check-in date.');
            setLoading(false);
            return;
        }
    
        try {
            const response = await axios.put(`http://localhost:8080/bookings/${id}`, {
                bookingDate,
                checkInDate,
                checkOutDate,
                numAdults,
                numChildren,
                numRooms,
                roomType,
                status
            });
    
            if (response.status === 200 || response.status === 204) {
                // Update local storage
                const allBookings = JSON.parse(localStorage.getItem('bookings')) || [];
                const updatedBookings = allBookings.map(b =>
                    b.id === id ? {
                        ...b,
                        bookingDate,
                        checkInDate,
                        checkOutDate,
                        numAdults,
                        numChildren,
                        numRooms,
                        roomType,
                        status
                    } : b
                );
                localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
                setSuccess(true);
                alert('Booking updated successfully!');
                setTimeout(() => {
                    navigate('/getallbookings');
                }, 2000);
            } else {
                setError('Unexpected response status: ' + response.status);
            }
        } catch (error) {
            console.error('Error updating booking:', error.response || error.message);
            setError(`Failed to update booking: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };
    
    
    if (error) {
        return <p style={styles.error}>{error}</p>;
    }

    if (success) {
        return <p style={styles.success}>Booking updated successfully!</p>;
    }

    if (!booking) {
        return <p>Loading...</p>;
    }

    return (
        <div style={styles.container}>
            <h2>Update Booking</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Booking Date:</label>
                    <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        required
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
                <div style={styles.formGroup}>
                    <label style={styles.label}>Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                        style={styles.select}
                    >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? 'Updating...' : 'Update Booking'}
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
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    select: {
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        fontWeight: 'bold',
    },
    success: {
        color: 'green',
        fontWeight: 'bold',
    },
};

export default UpdateBookingById;
