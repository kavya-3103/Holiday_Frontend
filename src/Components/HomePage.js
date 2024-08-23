import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [username, setUsername] = useState('Guest');
    const [userId, setUserId] = useState(null); // Added userId state
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [adults, setAdults] = useState(1);
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve username and userId from localStorage
        const storedUsername = localStorage.getItem('username');
        const storedUserId = localStorage.getItem('userId');
        if (storedUsername) {
            setUsername(storedUsername);
        }
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/usergetallplaces?arrivalDate=${arrivalDate}&departureDate=${departureDate}&adults=${adults}&location=${location}`);
    };

    return (
        <div style={styles.pageContainer}>
            <nav style={styles.navbar}>
                <h2 style={styles.navTitle}>HolidayHome</h2>
                <div style={styles.navLinks}>
                    <Link to="/" style={styles.navLink}>Home</Link>
                    {userId && (
                        <Link to={`/bookingdetails/${userId}`} style={styles.navLink}>My Bookings</Link>
                    )}
                    <Link to="/about" style={styles.navLink}>About</Link>
                    <Link to="/contact" style={styles.navLink}>Contact</Link>
                    <Link to="/login" style={styles.navLink}>Logout</Link>
                </div>
            </nav>
            <div style={styles.content}>
                <h1>Hi, {username}!</h1>
                <p>Welcome to the Holiday Home Booking Application.</p>
            </div>
            
            <div style={styles.formContainer}>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <label style={styles.label}>
                        Arrival Date:
                        <input
                            type="date"
                            value={arrivalDate}
                            onChange={(e) => setArrivalDate(e.target.value)}
                            style={styles.input}
                        />
                    </label>
                    <label style={styles.label}>
                        Departure Date:
                        <input
                            type="date"
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                            style={styles.input}
                        />
                    </label>
                    <label style={styles.label}>
                        Adults:
                        <input
                            type="number"
                            min="1"
                            value={adults}
                            onChange={(e) => setAdults(Number(e.target.value))}
                            style={styles.input}
                        />
                    </label>
                    <label style={styles.label}>
                        Location:
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            style={styles.input}
                        />
                    </label>
                    <button type="submit" style={styles.button}>Check Places</button>
                </form>
            </div>
            <footer style={styles.footer}>
                <p>© 2024 HolidayHome</p>
            </footer>
        </div>
    );
};

const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundImage: 'url(https://www.webintravel.com/wp-content/uploads/2022/03/hotel-hanieriani-GettyImages.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed', // Ensures the background image stays fixed during scrolling
    },
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(51, 51, 51, 0.7)', // Semi-transparent background for better visibility
        padding: '10px 20px',
        color: '#fff',
    },
    navTitle: {
        margin: 0,
        fontSize: '1.5rem',
    },
    navLinks: {
        display: 'flex',
        gap: '15px',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1rem',
    },
    content: {
        padding: '20px',
        color: '#fff',
        flex: 1,
    },
    formContainer: {
        backgroundColor: '#fff',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        margin: '20px',
        width: '90%',
        maxWidth: '800px',
        alignSelf: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    label: {
        margin: '0 10px',
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        marginTop: '5px',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        width: '150px',
    },
    button: {
        marginTop: '10px',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007BFF',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '16px',
    },
    footer: {
        backgroundColor: '#333',
        color: 'white',
        textAlign: 'center',
        padding: '10px 0',
        position: 'relative',
        marginTop: 'auto',
    }
};

export default HomePage;
