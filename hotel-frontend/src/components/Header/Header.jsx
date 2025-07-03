import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext.jsx';
import './Header.css';
import logo from '../../assets/logo.png';

const Header = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const closeMenus = () => {
      setMenuOpen(false);
      setProfileOpen(false);
    };
    document.addEventListener('click', closeMenus);
    return () => document.removeEventListener('click', closeMenus);
  }, []);

  return (
    <header className="main-header">
      <div className="container">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="Logo" />
        </Link>

        <nav className={`nav ${menuOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/rooms" onClick={() => setMenuOpen(false)}>Rooms</Link>
          <Link to="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </nav>

        <div className="actions" onClick={(e) => e.stopPropagation()}>
          <Link to="/book-now" className="book-btn">Book Now</Link>

          {isAuthenticated ? (
            <div className="profile">
              <button className="icon-btn" onClick={toggleProfile}>
                <i className="fas fa-user-circle"></i>
              </button>
              {profileOpen && (
                <div className="profile-menu">
                  <span>Hello, {user?.name || 'Guest'}</span>
                  <Link to="/profile">My Profile</Link>
                  <Link to="/bookings">My Bookings</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth">
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </div>

        <button className="hamburger" onClick={(e) => { e.stopPropagation(); toggleMenu(); }}>
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
