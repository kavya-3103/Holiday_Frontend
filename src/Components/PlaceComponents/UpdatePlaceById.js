import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePlaceById = () => {
    const { id: placeId } = useParams();  // Get the id from the URL path
    const [place, setPlace] = useState({ name: '', location: '', description: '', tourist_Attractions: '' });
    const [error, setError] = useState(null);
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

    const handleUpdatePlace = async () => {
        setLoading(true);
        setError(null);

        console.log('Updating place with data:', place);  // Log the place object being sent

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

    return (
        <div>
            <h2>Update Place</h2>
            <div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {place && (
                    <div>
                        <div>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    value={place.name}
                                    onChange={(e) => setPlace((prev) => ({ ...prev, name: e.target.value }))}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Location:
                                <input
                                    type="text"
                                    value={place.location}
                                    onChange={(e) => setPlace((prev) => ({ ...prev, location: e.target.value }))}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Description:
                                <textarea
                                    value={place.description}
                                    onChange={(e) => setPlace((prev) => ({ ...prev, description: e.target.value }))}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Tourist Attractions:
                                <textarea
                                    value={place.tourist_Attractions}
                                    onChange={(e) => setPlace((prev) => ({ ...prev, tourist_Attractions: e.target.value }))}
                                />
                            </label>
                        </div>
                        <button onClick={handleUpdatePlace} disabled={loading}>
                            {loading ? 'Updating...' : 'Update Place'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdatePlaceById;
