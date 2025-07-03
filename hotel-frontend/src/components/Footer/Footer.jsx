import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3>Luxury Hotel</h3>
          <p>Experience the ultimate in comfort and luxury with our premium accommodations and world-class service.</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/rooms">Rooms & Suites</Link></li>
            <li><Link to="/facilities">Facilities</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul className="contact-info">
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <span>123 Luxury Lane, Resort City, RC 10001</span>
            </li>
            <li>
              <i className="fas fa-phone-alt"></i>
              <span>+1 (555) 123-4567</span>
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              <span>info@luxuryhotel.com</span>
            </li>
            <li>
              <i className="fas fa-clock"></i>
              <span>24/7 Customer Support</span>
            </li>
          </ul>
        </div>
        
        
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Luxury Hotel. All Rights Reserved.</p>
          <ul className="footer-bottom-links">
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
            <li><Link to="/sitemap">Sitemap</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;