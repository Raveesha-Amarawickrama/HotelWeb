import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProfilePage.css';

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: ''
  });

  const navigate = useNavigate();
  const { userId } = useParams(); // If accessing other profiles via URL param

  useEffect(() => {
    // Fetch user data from API
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const userResponse = await fetch(`/api/users/${userId || 'me'}`);
        
        if (!userResponse.ok) {
          throw new Error(`Error: ${userResponse.status}`);
        }
        
        const userData = await userResponse.json();
        setUserData(userData);
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          bio: userData.bio || ''
        });

        // Fetch user bookings
        const bookingsResponse = await fetch(`/api/users/${userId || 'me'}/bookings`);
        
        if (bookingsResponse.ok) {
          const bookingsData = await bookingsResponse.json();
          setBookings(bookingsData);
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`/api/users/${userId || 'me'}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    // Handle logout logic here
    localStorage.removeItem('token'); // Remove auth token
    navigate('/login'); // Redirect to login page
  };

  if (loading) return <div className="loading">Loading profile...</div>;
  if (error) return <div className="error">Error loading profile: {error}</div>;
  if (!userData) return <div className="error">User not found</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <img 
            src={userData.avatar || '/default-avatar.png'} 
            alt="Profile" 
          />
          {!isEditing && (
            <button className="change-photo-btn">Change Photo</button>
          )}
        </div>
        
        <div className="profile-info">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="edit-profile-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="4"
                />
              </div>
              
              <div className="form-actions">
                <button type="submit" className="save-btn">Save Changes</button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <h1>{userData.name}</h1>
              <p className="user-email">{userData.email}</p>
              {userData.phone && <p className="user-phone">{userData.phone}</p>}
              {userData.bio && <p className="user-bio">{userData.bio}</p>}
              <div className="profile-actions">
                <button 
                  className="edit-profile-btn"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
                <button 
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="bookings-section">
        <h2>Your Bookings</h2>
        {bookings.length > 0 ? (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <img 
                  src={booking.room.image || '/default-room.jpg'} 
                  alt={booking.room.name} 
                  className="booking-image"
                />
                <div className="booking-details">
                  <h3>{booking.room.name}</h3>
                  <p className="booking-dates">
                    {new Date(booking.checkIn).toLocaleDateString()} to {new Date(booking.checkOut).toLocaleDateString()}
                  </p>
                  <p className="booking-guests">{booking.guests} guests</p>
                  <p className="booking-status">{booking.status}</p>
                  <button className="view-booking-btn">View Details</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You have no bookings yet.</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;