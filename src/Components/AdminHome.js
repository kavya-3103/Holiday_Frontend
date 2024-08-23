import React from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
    return (
        <div style={styles.pageContainer}>
            <nav style={styles.navbar}>
                <h2 style={styles.navTitle}>Admin Dashboard</h2>
                <div style={styles.navLinks}>
                <Link to="/getusers" style={styles.navLink}>All Users</Link> {/* Navigate to GetUsers */}

                    <Link to="/getallplaces" style={styles.navLink}>All Places</Link>
                    <Link to="/getallfeedbacks" style={styles.navLink}>All Feedbacks</Link>
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
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '100px',
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
        color: '#333',
        flex: 1,
    },
};

export default AdminHome;
