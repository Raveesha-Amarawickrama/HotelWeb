import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch user profile
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setUser(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setIsLoading(false);
      }
    };

    // Fetch user bookings
    const fetchUserBookings = async () => {
      try {
        const response = await fetch('/api/bookings', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }

        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchUserProfile();
    fetchUserBookings();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    // You might want to update the auth context here as well
  };

  if (isLoading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div className="profile-avatar">
          <img 
            src={user?.profilePic || '/assets/images/default-avatar.png'} 
            alt="Profile" 
          />
          <h3>{user?.name}</h3>
          <p>{user?.email}</p>
        </div>
        <div className="profile-menu">
          <button 
            className={activeTab === 'profile' ? 'active' : ''} 
            onClick={() => setActiveTab('profile')}
          >
            <i className="fas fa-user"></i> My Profile
          </button>
          <button 
            className={activeTab === 'bookings' ? 'active' : ''} 
            onClick={() => setActiveTab('bookings')}
          >
            <i className="fas fa-calendar-check"></i> My Bookings
          </button>
          <button 
            className={activeTab === 'settings' ? 'active' : ''} 
            onClick={() => setActiveTab('settings')}
          >
            <i className="fas fa-cog"></i> Account Settings
          </button>
          <button onClick={handleLogout} className="logout-btn">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>
      
      <div className="profile-content">
        {activeTab === 'profile' && (
          <div className="profile-details">
            <h2>My Profile</h2>
            <div className="profile-info">
              <div className="info-group">
                <label>Full Name</label>
                <p>{user?.name}</p>
              </div>
              <div className="info-group">
                <label>Email Address</label>
                <p>{user?.email}</p>
              </div>
              <div className="info-group">
                <label>Phone Number</label>
                <p>{user?.phone || 'Not provided'}</p>
              </div>
              <div className="info-group">
                <label>Address</label>
                <p>{user?.address || 'Not provided'}</p>
              </div>
              <button className="edit-profile-btn">
                <i className="fas fa-edit"></i> Edit Profile
              </button>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="profile-bookings">
            <h2>My Bookings</h2>
            {bookings.length === 0 ? (
              <div className="no-bookings">
                <i className="fas fa-calendar-times"></i>
                <p>You haven't made any bookings yet.</p>
                <button onClick={() => navigate('/rooms')} className="book-now-btn">
                  Book a Room Now
                </button>
              </div>
            ) : (
              <div className="bookings-list">
                {bookings.map(booking => (
                  <div className="booking-card" key={booking._id}>
                    <div className="booking-header">
                      <h3>{booking.roomType} Room</h3>
                      <span className={`booking-status ${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="booking-dates">
                      <div>
                        <span>Check In</span>
                        <p>{new Date(booking.checkIn).toLocaleDateString()}</p>
                      </div>
                      <div className="date-separator">
                        <i className="fas fa-arrow-right"></i>
                      </div>
                      <div>
                        <span>Check Out</span>
                        <p>{new Date(booking.checkOut).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="booking-details">
                      <div>
                        <span>Guests</span>
                        <p>{booking.guests} persons</p>
                      </div>
                      <div>
                        <span>Total Cost</span>
                        <p>${booking.totalCost}</p>
                      </div>
                      <div>
                        <span>Booking ID</span>
                        <p>{booking._id.substring(0, 8)}</p>
                      </div>
                    </div>
                    <div className="booking-actions">
                      <button className="view-details-btn">View Details</button>
                      {booking.status === 'CONFIRMED' && (
                        <button className="cancel-booking-btn">Cancel Booking</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="profile-settings">
            <h2>Account Settings</h2>
            <div className="settings-section">
              <h3>Change Password</h3>
              <div className="form-group">
                <label>Current Password</label>
                <input type="password" placeholder="Enter current password" />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" placeholder="Enter new password" />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input type="password" placeholder="Confirm new password" />
              </div>
              <button className="save-password-btn">Update Password</button>
            </div>
            
            <div className="settings-section">
              <h3>Notification Preferences</h3>
              <div className="preference-item">
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
                <div>
                  <p>Email Notifications</p>
                  <span>Receive updates about your bookings via email</span>
                </div>
              </div>
              <div className="preference-item">
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
                <div>
                  <p>SMS Notifications</p>
                  <span>Receive updates about your bookings via SMS</span>
                </div>
              </div>
              <div className="preference-item">
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
                <div>
                  <p>Special Offers & Promotions</p>
                  <span>Receive special offers, promotions and discounts</span>
                </div>
              </div>
              <button className="save-preferences-btn">Save Preferences</button>
            </div>
            
            <div className="settings-section danger-zone">
              <h3>Danger Zone</h3>
              <p>Once you delete your account, there is no going back. Please be certain.</p>
              <button className="delete-account-btn">Delete Account</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;