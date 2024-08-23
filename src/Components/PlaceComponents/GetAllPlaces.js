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
            const arrivalDate = queryParams.get('arrivalDate');
            const departureDate = queryParams.get('departureDate');
            const adults = queryParams.get('adults');
            const location = queryParams.get('location');

            let result = [...places];

            if (location) {
                result = result.filter(place => place.location.toLowerCase().includes(location.toLowerCase()));
            }

            // Add more filtering based on arrivalDate, departureDate, and adults if needed

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
    
    // const handleDeletePlace = (placeId) => {
    //     navigate(`/deleteplace/${placeId}`);
    // };
    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>List of Places</h2>
            <button onClick={handleAddPlace}>Add Place</button>

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
                                    <button onClick={() => handleUpdatePlace(place.placeId)}>
                                        Update
                                    </button>
                                    <button onClick={() => handleDeletePlace(place.placeId)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default GetAllPlaces;
