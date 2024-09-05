import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePlaceById = () => {
    const { id: placeId } = useParams();  // Get the id from the URL path
    const [place, setPlace] = useState({ name: '', location: '', description: '', tourist_Attractions: '' });
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (placeId) {
            fetchPlace(placeId);
        }
    }, [placeId]);

    const fetchPlace = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:8080/places/${id}`);
            if (response.data) {
                setPlace(response.data);
            } else {
                setError('Place not found.');
            }
        } catch (error) {
            console.error('Error fetching place:', error);
            setError('Failed to fetch place.');
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!place.name.trim()) {
            errors.name = 'Name is required.';
        }

        if (!place.location.trim()) {
            errors.location = 'Location is required.';
        }

        if (!place.description.trim()) {
            errors.description = 'Description is required.';
        }

        if (!place.tourist_Attractions.trim()) {
            errors.tourist_Attractions = 'Tourist attractions are required.';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleUpdatePlace = async () => {
        setLoading(true);
        setError(null);

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8080/places/${placeId}`, place);
            console.log('Place updated:', response.data);
            window.alert('Update successful');  // Show alert
            navigate('/getallplaces'); // Navigate to the places list page after the alert
        } catch (error) {
            console.error('Error updating place:', error.response?.data || error.message);
            setError('Failed to update place.');
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'rgb(2,0,36)',
            background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,220,255,1) 0%, rgba(37,9,121,1) 50%, rgba(0,241,255,1) 100%)',
            padding: '20px',
        },
        heading: {
            fontSize: '2rem',
            color: '#333',
            marginBottom: '20px',
        },
        formContainer: {
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            maxWidth: '600px',
            width: '100%',
        },
        errorMessage: {
            color: 'red',
            marginBottom: '10px',
        },
        formGroup: {
            marginBottom: '15px',
        },
        inputField: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
        },
        textareaField: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            height: '100px',
            resize: 'vertical',
        },
        updateButton: {
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#007BFF',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '16px',
        },
        updateButtonDisabled: {
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#ddd',
            color: '#fff',
            cursor: 'not-allowed',
            fontSize: '16px',
        },
        validationError: {
            color: 'red',
            fontSize: '0.9rem',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Update Place</h2>
            <div style={styles.formContainer}>
                {error && <p style={styles.errorMessage}>{error}</p>}
                {place && (
                    <div>
                        <div style={styles.formGroup}>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    style={styles.inputField}
                                    value={place.name}
                                    onChange={(e) => setPlace((prev) => ({ ...prev, name: e.target.value }))}
                                />
                                {validationErrors.name && <p style={styles.validationError}>{validationErrors.name}</p>}
                            </label>
                        </div>
                        <div style={styles.formGroup}>
                            <label>
                                Location:
                                <input
                                    type="text"
                                    style={styles.inputField}
                                    value={place.location}
                                    onChange={(e) => setPlace((prev) => ({ ...prev, location: e.target.value }))}
                                />
                                {validationErrors.location && <p style={styles.validationError}>{validationErrors.location}</p>}
                            </label>
                        </div>
                        <div style={styles.formGroup}>
                            <label>
                                Description:
                                <textarea
                                    style={styles.textareaField}
                                    value={place.description}
                                    onChange={(e) => setPlace((prev) => ({ ...prev, description: e.target.value }))}
                                />
                                {validationErrors.description && <p style={styles.validationError}>{validationErrors.description}</p>}
                            </label>
                        </div>
                        <div style={styles.formGroup}>
                            <label>
                                Tourist Attractions:
                                <textarea
                                    style={styles.textareaField}
                                    value={place.tourist_Attractions}
                                    onChange={(e) => setPlace((prev) => ({ ...prev, tourist_Attractions: e.target.value }))}
                                />
                                {validationErrors.tourist_Attractions && <p style={styles.validationError}>{validationErrors.tourist_Attractions}</p>}
                            </label>
                        </div>
                        <button 
                            onClick={handleUpdatePlace} 
                            style={loading ? styles.updateButtonDisabled : styles.updateButton} 
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Place'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdatePlaceById;
