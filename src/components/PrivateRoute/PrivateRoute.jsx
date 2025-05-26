import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import Home from '../../pages/Home/Home';
import AboutLearnMore from '../../pages/AboutLearnMore/AboutLearnMore';
import Rooms from '../../pages/Rooms/Rooms';


import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/about-learn-more" element={<AboutLearnMore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/destinations" element={<Destinations />} />
          
          {/* Protected routes */}
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          
          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;