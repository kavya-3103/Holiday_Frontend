import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeletePlaceById = () => {
    const { id } = useParams(); // Retrieve place ID from URL parameters
    const navigate = useNavigate();

    useEffect(() => {
        const deletePlace = async () => {
            try {
                await axios.delete(`http://localhost:8080/places/${id}`);
                alert('Place deleted successfully');
                navigate('/getallplaces'); // Redirect to list of places after successful deletion
            } catch (error) {
                alert('Failed to delete place. Please check the ID and try again.');
            }
        };

        deletePlace();
    }, [id, navigate]);

    return (
        <div>
            <h2>Deleting Place...</h2>
        </div>
    );
};

export default DeletePlaceById;
