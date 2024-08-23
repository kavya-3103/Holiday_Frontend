import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    // Inline CSS styles
    const navbarStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: '#fff'
    };

    const navbarLeftStyle = {
        fontSize: '1.5em'
    };

    const navbarRightStyle = {
        display: 'flex',
        gap: '20px'
    };

    const navItemStyle = {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1em'
    };

    return (
        <nav style={navbarStyle}>
            <div style={navbarLeftStyle}>
                <Link to="/" style={navItemStyle}>HolidayHome</Link>
            </div>
            <div style={navbarRightStyle}>
                <Link to="/home" style={navItemStyle}>Home</Link>
                <Link to="/places" style={navItemStyle}>Places</Link>
                <Link to="/aboutus" style={navItemStyle}>AboutUs</Link>
                <Link to="/contactus" style={navItemStyle}>ContactUs</Link>
                <Link to="`/bookingdetails/${userId}`" style={navItemStyle}>My Booking</Link> {/* New link */}
                <Link to="/logout" style={navItemStyle}>Logout</Link>
            </div>
        </nav>
    );
};

export default NavBar;
