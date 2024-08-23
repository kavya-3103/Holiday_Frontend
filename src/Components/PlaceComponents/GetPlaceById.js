import React, { useState } from 'react';
import axios from 'axios';

const GetPlaceById = () => {
    const [placeId, setPlaceId] = useState('');
    const [place, setPlace] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFetchPlace = async () => {
        setLoading(true);
        setError(null);
        setPlace(null);

        try {
            const response = await axios.get(`http://localhost:8080/places/${placeId}`);
            setPlace(response.data);
        } catch (error) {
            console.error('Error fetching place:', error);
            setError('Failed to fetch place. Please check the ID and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Get Place By ID</h2>
            <div>
                <label>
                    Place ID:
                    <input
                        type="text"
                        value={placeId}
                        onChange={(e) => setPlaceId(e.target.value)}
                        placeholder="Enter place ID"
                    />
                </label>
                <button onClick={handleFetchPlace} disabled={loading}>
                    {loading ? 'Loading...' : 'Fetch Place'}
                </button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {place && (
                <div>
                    <h3>Place Details</h3>
                    <p><strong>ID:</strong> {place.placeId}</p>
                    <p><strong>Name:</strong> {place.name}</p>
                    <p><strong>Location:</strong> {place.location}</p>
                    <p><strong>Description:</strong> {place.description}</p>
                    <p><strong>Attractions:</strong> {place.attractions}</p>
                </div>
            )}
        </div>
    );
};

export default GetPlaceById;
