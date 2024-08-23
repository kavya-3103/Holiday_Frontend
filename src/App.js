// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import Registration from './Components/Registration';
import Welcome from './Components/Welcome';
import Logout from './Components/Logout';

import About from './Components/AboutUs';
import Contact from './Components/ContactUs';
import GetAllPlaces from './Components/PlaceComponents/GetAllPlaces';

import AdminHome from './Components/AdminHome';
import GetUsers from './Components/UserComponents/GetUsers';
import GetAllFeedbacks from './Components/FeedbackComponent/GetAllFeedbacks';
import UpdateUserById from './Components/UserComponents/UpdateUserById';
import AddPlace from './Components/PlaceComponents/AddPlace';
import UpdatePlaceByIdPlace from './Components/PlaceComponents/UpdatePlaceById';
import UpdatePlaceById from './Components/PlaceComponents/UpdatePlaceById';
import DeletePlaceById from './Components/PlaceComponents/DeletePlaceById';
import UserGetAllPlaces from './Components/PlaceComponents/UserGetAllPlaces';
import GetFeedbackById from './Components/FeedbackComponent/GetFeedbackById';
import GetFeedbackByPlaceId from './Components/FeedbackComponent/GetFeedbackByPlaceId';
import AddBooking from './Components/AddBooking';
import AddFeedback from './Components/FeedbackComponent/AddFeedback';
import BookingDetails from './Components/GetBookingDetailsByUserId';
import GetBookingDetailsByUserId from './Components/GetBookingDetailsByUserId';


const App = () => {
    return (
        <Router>
            <Routes>
              <Route path="/" element={<Welcome />} />
               <Route path="/Home" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/getallplaces" element={<GetAllPlaces />} />
                <Route path="/adminhome" element={<AdminHome />} />
                <Route path="/getusers" element={<GetUsers />} /> {/* Route for GetUsers */}
                <Route path="/getallplaces" element={<GetAllPlaces />} /> 
                <Route path="/usergetallplaces" element={<UserGetAllPlaces />} /> 
                <Route path="/addbooking" element={<AddBooking />} />

                <Route path="/addplace" element={<AddPlace />} /> 
                <Route path="/updateplace/:id" element={<UpdatePlaceById />} />
                <Route path="/deleteplace/:id" element={<DeletePlaceById />} /> 
                <Route path="/feedbacks/place/:placeId" element={<GetFeedbackByPlaceId />} />
                <Route path="/addfeedback" element={<AddFeedback />} />
                <Route path="/bookingdetails/:userId" element={<GetBookingDetailsByUserId />} />






                <Route path="/getusers" element={<GetUsers />} /> {/* Route for GetUsers */}
                <Route path="/getallfeedbacks" element={<GetAllFeedbacks />} /> {/* Route for GetUsers */}
                <Route path="/updateuser" element={<UpdateUserById />} /> {/* Route for UpdateUserById */}







            </Routes>
        </Router>
    );
};

export default App;
