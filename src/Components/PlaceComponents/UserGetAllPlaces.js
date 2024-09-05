import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserGetAllPlaces = () => {
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [selectedPlaceId, setSelectedPlaceId] = useState(null);
    const [displayedFeedbacks, setDisplayedFeedbacks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlacesAndFeedbacks = async () => {
            try {
                const [placesResponse, feedbacksResponse] = await Promise.all([
                    axios.get('http://localhost:8080/places'),
                    axios.get('http://localhost:8080/feedbacks')
                ]);

                setPlaces(placesResponse.data);
                setFeedbacks(feedbacksResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data.');
            } finally {
                setLoading(false);
            }
        };

        fetchPlacesAndFeedbacks();
    }, []);

    useEffect(() => {
        const filterPlaces = () => {
            const location = new URLSearchParams(window.location.search).get('location');

            let result = [...places];

            if (location) {
                result = result.filter(place => place.location.toLowerCase().includes(location.toLowerCase()));
            }

            setFilteredPlaces(result);
        };

        filterPlaces();
    }, [places]);

    const handleCheckFeedback = (placeId) => {
        setSelectedPlaceId(placeId);
        const filteredFeedbacks = feedbacks.filter(feedback => feedback.place.placeId === placeId);
        setDisplayedFeedbacks(filteredFeedbacks);
    };

    const handleBookNow = (placeId) => {
        navigate(`/addbooking?placeId=${placeId}`);
    };

    const handleAddFeedback = (placeId) => {
        navigate(`/addfeedback?placeId=${placeId}`);
    };

    if (loading) {
        return <p style={styles.loading}>Loading...</p>;
    }

    return (<>
    <div style={styles.MainContainer}>
    <div style={styles.container}>
            <h2 style={styles.heading}>Places in Your Location</h2>
            {error && <p style={styles.error}>{error}</p>}
            {filteredPlaces.length === 0 ? (
                <p style={styles.noPlaces}>No places found for this location.</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th>Place ID</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Description</th>
                            <th>Attractions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPlaces.map(place => (
                            <tr key={place.placeId} style={styles.tableRow}>
                                <td>{place.placeId}</td>
                                <td>{place.name}</td>
                                <td>{place.location}</td>
                                <td style={{width:'370px', marginLeft:'10px'}}>{place.description}</td>
                                <td>{place.tourist_Attractions}</td>
                                <td>
                                    <button onClick={() => handleCheckFeedback(place.placeId)} style={styles.button}>
                                        Check Feedback
                                    </button>
                                    <button onClick={() => handleBookNow(place.placeId)} style={styles.button}>
                                        Book Now
                                    </button>
                                    <button onClick={() => handleAddFeedback(place.placeId)} style={styles.button}>
                                        Add Feedback
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {selectedPlaceId && (
                <div style={styles.feedbackContainer}>
                    <h3 style={styles.feedbackHeading}>Feedback for Place {selectedPlaceId}</h3>
                    {displayedFeedbacks.length === 0 ? (
                        <p>No feedback found for this place.</p>
                    ) : (
                        <ul style={styles.feedbackList}>
                            {displayedFeedbacks.map(feedback => (
                                <li key={feedback.feedbackId} style={styles.feedbackItem}>
                                    <p><strong>Rating:</strong> {feedback.rating}</p>
                                    <p><strong>Comment:</strong> {feedback.comment}</p>
                                    <p><strong>User:</strong> {feedback.user.username}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    </div>
        
    </>
        
    );
};

const styles = {
    MainContainer:{
        
        width:'100%',
        height:'100vh',
        
    },
    container: {
        padding: '20px',
        background:"white",
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        margin: '20px auto',
        width: '90%',
        maxWidth: '1200px',
    },
    heading: {
        fontSize: '2rem',
        marginBottom: '20px',
        color: '#333',
    },
    error: {
        color: 'red',
    },
    noPlaces: {
        textAlign: 'center',
        color: '#666',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableRow: {
        borderBottom: '1px solid #ddd',
    },
    button: {
        marginRight: '10px',
        padding: '8px 12px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007BFF',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '14px',
    },
    feedbackContainer: {
        marginTop: '20px',
    },
    feedbackHeading: {
        fontSize: '1.5rem',
        marginBottom: '10px',
        color: '#333',
    },
    feedbackList: {
        listStyleType: 'none',
        padding: '0',
    },
    feedbackItem: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
    loading: {
        textAlign: 'center',
        marginTop: '20px',
    },
};

export default UserGetAllPlaces;
