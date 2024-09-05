import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPlace = () => {
    const [place, setPlace] = useState({
        name: '',
        location: '',
        description: '',
        tourist_Attractions: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    // Input field change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlace((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Validate form inputs
    const validateForm = () => {
        const errors = {};

        if (!place.name.trim()) {
            errors.name = 'Place name is required';
        } else if (place.name.length < 3) {
            errors.name = 'Place name must be at least 3 characters long';
        }

        if (!place.location.trim()) {
            errors.location = 'Location is required';
        }

        if (!place.description.trim()) {
            errors.description = 'Description is required';
        } else if (place.description.length < 10) {
            errors.description = 'Description must be at least 10 characters long';
        }

        if (!place.tourist_Attractions.trim()) {
            errors.tourist_Attractions = 'Attractions are required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Submit form handler
    const handleAddPlace = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/places', place);
            setSuccess('Place added successfully');
            alert('Place added successfully');
            setPlace({
                name: '',
                location: '',
                description: '',
                tourist_Attractions: ''
            });
            setTimeout(() => {
                navigate('/getallplaces');
            }, 1000);
        } catch (error) {
            setError('Failed to add place.');
        } finally {
            setLoading(false);
        }
    };

    const containerStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        backgroundColor: '#fff'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '10px',
        fontWeight: 'bold'
    };

    const inputStyle = {
        width: '100%',
        padding: '8px',
        marginTop: '4px',
        border: '1px solid #ccc',
        borderRadius: '4px'
    };

    const textareaStyle = {
        ...inputStyle,
        height: '100px',
        resize: 'vertical'
    };

    const buttonStyle = {
        display: 'block',
        width: '100%',
        padding: '10px',
        marginTop: '20px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer'
    };

    const disabledButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#6c757d',
        cursor: 'not-allowed'
    };

    const messageStyle = {
        textAlign: 'center',
        marginTop: '10px',
        fontSize: '16px'
    };

    const errorStyle = {
        ...messageStyle,
        color: 'red'
    };

    const successStyle = {
        ...messageStyle,
        color: 'green'
    };

    const formErrorStyle = {
        color: 'red',
        fontSize: '14px',
        marginTop: '5px'
    };

    return (
        <div style={containerStyle}>
            <h2>Add New Place</h2>
            <div>
                <label style={labelStyle}>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={place.name}
                        onChange={handleChange}
                        placeholder="Enter place name"
                        style={inputStyle}
                    />
                    {formErrors.name && <p style={formErrorStyle}>{formErrors.name}</p>}
                </label>
            </div>
            <div>
                <label style={labelStyle}>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={place.location}
                        onChange={handleChange}
                        placeholder="Enter place location"
                        style={inputStyle}
                    />
                    {formErrors.location && <p style={formErrorStyle}>{formErrors.location}</p>}
                </label>
            </div>
            <div>
                <label style={labelStyle}>
                    Description:
                    <textarea
                        name="description"
                        value={place.description}
                        onChange={handleChange}
                        placeholder="Enter place description"
                        style={textareaStyle}
                    />
                    {formErrors.description && <p style={formErrorStyle}>{formErrors.description}</p>}
                </label>
            </div>
            <div>
                <label style={labelStyle}>
                    Attractions:
                    <input
                        type="text"
                        name="tourist_Attractions"
                        value={place.tourist_Attractions}
                        onChange={handleChange}
                        placeholder="Enter nearby attractions"
                        style={inputStyle}
                    />
                    {formErrors.tourist_Attractions && <p style={formErrorStyle}>{formErrors.tourist_Attractions}</p>}
                </label>
            </div>
            <button 
                onClick={handleAddPlace} 
                disabled={loading} 
                style={loading ? disabledButtonStyle : buttonStyle}
            >
                {loading ? 'Adding...' : 'Add Place'}
            </button>
            {error && <p style={errorStyle}>{error}</p>}
            {success && <p style={successStyle}>{success}</p>}
        </div>
    );
};

export default AddPlace;
