import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPlace = () => {
    const [place, setPlace] = useState({
        name: '',
        location: '',
        description: '',
        attractions: '' // Ensure this matches the field name in your backend
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Use the useNavigate hook for navigation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlace((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddPlace = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post('http://localhost:8080/places', place);
            console.log('Place added:', response.data);
            setSuccess('Place added successfully');
            alert('Place added successfully'); // Show alert on success
            setPlace({
                name: '',
                location: '',
                description: '',
                attractions: ''
            }); // Clear form after success
            setTimeout(() => {
                navigate('/getallplaces'); // Navigate to GetAllPlaces after a short delay
            }, 1000); // Adjust delay if needed
        } catch (error) {
            console.error('Error adding place:', error);
            setError('Failed to add place.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Add New Place</h2>
            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={place.name}
                        onChange={handleChange}
                        placeholder="Enter place name"
                    />
                </label>
            </div>
            <div>
                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={place.location}
                        onChange={handleChange}
                        placeholder="Enter place location"
                    />
                </label>
            </div>
            <div>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={place.description}
                        onChange={handleChange}
                        placeholder="Enter place description"
                    />
                </label>
            </div>
            <div>
                <label>
                    Attractions:
                    <input
                        type="text"
                        name="tourist_Attractions"
                        value={place.tourist_Attractions}
                        onChange={handleChange}
                        placeholder="Enter nearby attractions"
                    />
                </label>
            </div>
            <button onClick={handleAddPlace} disabled={loading}>
                {loading ? 'Adding...' : 'Add Place'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default AddPlace;
