import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar'; // Import the NavBar component

const Contact = () => {
    return (
        <div>
            {/* <NavBar /> */}
            <div style={styles.container}>
                <h1>Contact Us</h1>
                <p>If you have any questions or feedback, please feel free to reach out to us:</p>
                <p>Email: support@holidayhome.com</p>
                <p>Phone: +1-800-123-4567</p>
                <p>Address: 123 Holiday Street, Vacation City, VC 12345</p>
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

export default Contact;
