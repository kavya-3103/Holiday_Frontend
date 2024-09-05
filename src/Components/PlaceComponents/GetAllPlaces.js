import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const GetAllPlaces = () => {
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await axios.get('http://localhost:8080/places');
                setPlaces(response.data);
            } catch (error) {
                console.error('Error fetching places:', error);
                setError('Failed to fetch places.');
            } finally {
                setLoading(false);
            }
        };

        fetchPlaces();
    }, []);

    useEffect(() => {
        const filterPlaces = () => {
            const location = queryParams.get('location');

            let result = [...places];

            if (location) {
                result = result.filter(place => place.location.toLowerCase().includes(location.toLowerCase()));
            }

            setFilteredPlaces(result);
        };

        filterPlaces();
    }, [places, location.search]);

    const handleAddPlace = () => {
        navigate('/addplace');
    };

    const handleUpdatePlace = (placeId) => {
        navigate(`/updateplace/${placeId}`);
    };

    const handleDeletePlace = async (placeId) => {
        if (window.confirm('Are you sure you want to delete this place?')) {
            try {
                await axios.delete(`http://localhost:8080/places/${placeId}`);
                setPlaces(places.filter(place => place.placeId !== placeId));
                setFilteredPlaces(filteredPlaces.filter(place => place.placeId !== placeId));
            } catch (error) {
                console.error('Error deleting place:', error);
                setError('Failed to delete place.');
            }
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={styles.pageContainer}>
            <div style={styles.container}>
                <h2 style={styles.heading}>List of Places</h2>
                <button onClick={handleAddPlace} style={styles.button}>Add Place</button>

                {error && <p style={styles.error}>{error}</p>}
                {filteredPlaces.length === 0 ? (
                    <p>No places found.</p>
                ) : (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Place ID</th>
                                <th style={styles.th}>Name</th>
                                <th style={styles.th}>Location</th>
                                <th style={styles.th}>Description</th>
                                <th style={styles.th}>Attractions</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPlaces.map(place => (
                                <tr key={place.placeId}>
                                    <td style={styles.td}>{place.placeId}</td>
                                    <td style={styles.td}>{place.name}</td>
                                    <td style={styles.td}>{place.location}</td>
                                    <td style={styles.td}>{place.description}</td>
                                    <td style={styles.td}>{place.tourist_Attractions}</td>
                                    <td style={styles.actions}>
                                        <button onClick={() => handleUpdatePlace(place.placeId)} style={styles.actionButton}>
                                            Update
                                        </button>
                                        <button onClick={() => handleDeletePlace(place.placeId)} style={styles.actionButton}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        minHeight: '100vh',
        background: 'rgb(2,0,36)',
background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,220,255,1) 0%, rgba(37,9,121,1) 50%, rgba(0,241,255,1) 100%)',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        padding: '20px',
        backgroundColor: '#f4f4f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '1000px',
        width: '100%',
    },
    heading: {
        fontSize: '2rem',
        color: 'black',
        marginBottom: '20px',
        textAlign: 'center',
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007BFF',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '16px',
        marginBottom: '20px',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#fff',
    },
    th: {
        backgroundColor: '#007BFF',
        color: '#fff',
        padding: '10px',
        textAlign: 'left',
    },
    td: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
    actions: {
        display: 'flex',
        gap: '10px', // Space between buttons
        justifyContent: 'center',
    },
    actionButton: {
        padding: '5px 10px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007BFF',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '14px',
    },
};

export default GetAllPlaces;
