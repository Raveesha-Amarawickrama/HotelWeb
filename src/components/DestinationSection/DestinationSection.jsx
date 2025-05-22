import React, { useState } from 'react';
import { Phone, Mail, Clock, CreditCard } from 'lucide-react';
import './destinationsection.css';

const DestinationSection = () => {
  const [mapLoaded, setMapLoaded] = useState(true);

  return (
    <div className="destination-container">
      <h1 className="destination-header">Destination</h1>
      
      {/* Map Section */}
      <div className="map-container">
        {mapLoaded ? (
          <>
            <div className="map-background">
              {/* Water feature */}
              <div className="water-feature"></div>
              
              {/* Grid lines */}
              <div className="map-grid-h grid-h-1"></div>
              <div className="map-grid-h grid-h-2"></div>
              <div className="map-grid-v grid-v-1"></div>
              <div className="map-grid-v grid-v-2"></div>
            </div>
            
            {/* Markers */}
            <div className="map-marker marker-main">
              <div className="marker-dot marker-red"></div>
              <div className="marker-label">Hotel</div>
            </div>
            
            <div className="map-marker marker-city">
              <div className="marker-dot marker-small marker-purple"></div>
            </div>
            
            <div className="map-marker marker-beach">
              <div className="marker-dot marker-small marker-yellow"></div>
            </div>
            
            <div className="map-marker marker-airport">
              <div className="marker-dot marker-small marker-green"></div>
            </div>
            
            {/* Controls */}
            <div className="map-controls">
              <div className="zoom-controls">
                <button className="zoom-button zoom-in">+</button>
                <button className="zoom-button">−</button>
              </div>
              <div className="person-view">👤</div>
            </div>
            
            <div className="map-copyright">Map data ©2025</div>
          </>
        ) : (
          <div className="map-loading">
            <span>Map loading...</span>
          </div>
        )}
      </div>
      
      {/* Information Grid */}
      <div className="info-grid">
        {/* Hotel Info */}
        <div className="info-section">
          <h2 className="info-title">Shangri-La Gardens</h2>
          <div className="info-content">
            <p className="info-item">123 Paradise Avenue</p>
            <p className="info-item">Oceanview, CA 94000</p>
            
            <div className="contact-info">
              <Phone className="contact-icon" size={12} />
              <span>+1 (800) 555-0123</span>
            </div>
            
            <div className="contact-info">
              <Mail className="contact-icon" size={12} />
              <span>reservations@shangri-la.com</span>
            </div>
          </div>
        </div>
        
        {/* Check-in/Check-out */}
        <div className="info-section">
          <h2 className="info-title">Check-in / Check-out</h2>
          <div className="info-content">
            <div className="check-time">
              <Clock className="check-icon" size={12} />
              <div className="check-details">
                <p>Check-in time: 3:00 PM</p>
                <p className="check-note">Please arrive at the check-in desk</p>
              </div>
            </div>
            
            <div className="check-time">
              <Clock className="check-icon" size={12} />
              <div className="check-details">
                <p>Check-out time: 11:00 AM</p>
                <p className="check-note">Late check-out available upon request</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="info-section">
          <h2 className="info-title">Payment Methods</h2>
          <div className="info-content">
            <p>We accept the following payment methods:</p>
            
            <div className="payment-methods">
              <div className="payment-card">
                <CreditCard size={16} />
              </div>
              <div className="payment-card">
                <span className="card-visa">VISA</span>
              </div>
              <div className="payment-card">
                <span className="card-mc">MC</span>
              </div>
              <div className="payment-card">
                <span className="card-amex">AMEX</span>
              </div>
              <div className="payment-card">
                <span className="card-jcb">JCB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationSection;