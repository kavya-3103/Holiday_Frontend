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
            const arrivalDate = new URLSearchParams(window.location.search).get('arrivalDate');
            const departureDate = new URLSearchParams(window.location.search).get('departureDate');
            const adults = new URLSearchParams(window.location.search).get('adults');
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
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>List of Places</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {filteredPlaces.length === 0 ? (
                <p>No places found.</p>
            ) : (
                <table>
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
                            <tr key={place.placeId}>
                                <td>{place.placeId}</td>
                                <td>{place.name}</td>
                                <td>{place.location}</td>
                                <td>{place.description}</td>
                                <td>{place.tourist_Attractions}</td>
                                <td>
                                    <button onClick={() => handleCheckFeedback(place.placeId)}>
                                        Check Feedback
                                    </button>
                                    <button onClick={() => handleBookNow(place.placeId)}>
                                        Book Now
                                    </button>
                                    <button onClick={() => handleAddFeedback(place.placeId)}>
                                        Add Feedback
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {selectedPlaceId && (
                <div>
                    <h3>Feedback for Place {selectedPlaceId}</h3>
                    {displayedFeedbacks.length === 0 ? (
                        <p>No feedback found for this place.</p>
                    ) : (
                        <ul>
                            {displayedFeedbacks.map(feedback => (
                                <li key={feedback.feedbackId}>
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
    );
};

export default UserGetAllPlaces;
