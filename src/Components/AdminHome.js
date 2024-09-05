import React from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
    return (
        <div style={styles.pageContainer}>
            <nav style={styles.navbar}>
                <h2 style={styles.navTitle}>Admin Dashboard</h2>
                <div style={styles.navLinks}>
                    <Link to="/getusers" style={styles.navLink}>All Users</Link>
                    <Link to="/getallplaces" style={styles.navLink}>All Places</Link>
                    <Link to="/getallfeedbacks" style={styles.navLink}>All Feedbacks</Link>
                    <Link to="/getallbookings" style={styles.navLink}>All Bookings</Link>
                    <Link to="/login" style={styles.navLink}>Logout</Link>
                </div>
            </nav>
            <div style={styles.content}>
                <h1>Welcome to the Admin Dashboard!</h1>
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        height: '81.7vh',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '100px',
        backgroundColor: 'lightblue',
        backgroundImage: 'url(/asset/admin_bg8.jpg)', // Add your image path here
        backgroundSize: 'cover', // Ensure the image covers the whole container
        backgroundPosition: 'center', // Center the background image
        backgroundRepeat: 'no-repeat', // Prevent the background image from repeating
        overflow: 'hidden', // Prevent scrolling
    },
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333',
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
        color: 'black',
        flex: 1,
        
    },
};
// document.body.style.overflow = 'hidden';
// document.documentElement.style.overflow = 'hidden';
export default AdminHome;
