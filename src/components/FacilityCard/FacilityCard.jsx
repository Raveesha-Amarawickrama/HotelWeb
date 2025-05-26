import React from 'react';
import './FacilityCard.css';

const FacilityCard = ({ title, icon }) => {
  return (
    <div className="facility-card">
      <div className="facility-icon">
        <i className={`fas fa-${icon}`}></i>
      </div>
      <div className="facility-title">{title}</div>
    </div>
  );
};

export default FacilityCard;