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
import UpdatePlaceById from './Components/PlaceComponents/UpdatePlaceById';
import UserGetAllPlaces from './Components/PlaceComponents/UserGetAllPlaces';
import GetFeedbackByPlaceId from './Components/FeedbackComponent/GetFeedbackByPlaceId';
import AddBooking from './Components/AddBooking';
import AddFeedback from './Components/FeedbackComponent/AddFeedback';
import GetBookingDetailsByUserId from './Components/GetBookingDetailsByUserId';
import MyBooking from './Components/MyBooking';
import GetAllBookings from './Components/GetAllBookings';
import UpdateBookingById from './Components/UpdateBookingById';

const App = () => {
    return (
        <>
            <Router>
            <Routes>

{/* User operations */}
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/Home" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/getallplaces" element={<GetAllPlaces />} />  
              <Route path="/usergetallplaces" element={<UserGetAllPlaces />} /> 
             
              <Route path="/addbooking" element={<AddBooking />} />   
              <Route path="/addfeedback" element={<AddFeedback />} />
              <Route path="/feedbacks/place/:placeId" element={<GetFeedbackByPlaceId />} />
              <Route path="/mybookings" element={<MyBooking />} />  {/* Add this route */}

{/* Admin operations */}
                <Route path="/adminhome" element={<AdminHome />} />
                <Route path="/getusers" element={<GetUsers />} /> {/* Route for GetUsers */}
                <Route path="/addplace" element={<AddPlace />} /> 
                <Route path="/updateplace/:id" element={<UpdatePlaceById />} />
                <Route path="/bookingdetails/:userId" element={<GetBookingDetailsByUserId />} />
                <Route path="/getallbookings" element={<GetAllBookings />} /> {/* Add this route */}
                <Route path="/updatebooking/:id" element={<UpdateBookingById/>} /> {/* Add this route */}
                <Route path="/getallfeedbacks" element={<GetAllFeedbacks />} /> {/* Route for GetUsers */}
                {/* <Route path="/updateuser" element={<UpdateUserById />} />  */}
                <Route path="/updateuser/:id" element={<UpdateUserById />} />
            </Routes>
        </Router>
        </>
        
    );
};

export default App;

// Validations added:
// Registration, Login, AddBooking, AddFeedback, AddPlace, UpdatePlaceById, UpdateBookingById(),
