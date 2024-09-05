import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar'; // Import the NavBar component

const About = () => {
    return (
        <div>
            {/* <NavBar /> */}
            <div style={styles.container}>
                <h1>About Us</h1>
                <p>Welcome to the Holiday Home Booking Application. We are dedicated to providing the best experience for finding and booking your perfect holiday home. Our team is passionate about travel and committed to ensuring that your stay is comfortable and memorable.</p>
                <p>Feel free to contact us if you have any questions or need assistance.</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
    }
};

export default About;
