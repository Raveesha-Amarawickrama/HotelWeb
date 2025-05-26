import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home/Home';
import About from '../src/components/AboutSection/About';
import Rooms from './pages/Rooms/Rooms';
import AboutLearnMore from './pages/AboutLearnMore/AboutLearnMore';
import Profile from './pages/ProfilePage/ProfilePage';
import Login from '../src/components/Auth/Login';
import Signup from '../src/components/Auth/SignUp';
import ContactUs from './pages/Contact/Contact'; // Added ContactUs import

import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/about-learn-more" element={<AboutLearnMore />} />
          <Route path="/contact" element={<ContactUs />} /> {/* Added ContactUs route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected routes */}
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;