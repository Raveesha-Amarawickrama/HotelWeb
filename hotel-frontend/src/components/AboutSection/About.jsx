import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutSection.css';
import aboutImage from '../../assets/about.png';

const About = () => {
  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    navigate('/about-learn-more');
  };

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-content">
          <h2>About Us</h2>
          <p className="about-description">
            A precious jewel strung along the Indian Ocean overlooking the historic 
            Galle Face Green, Shangri-La Colombo celebrates the best of the city...
          </p>
          <ul className="about-features">
            <li>541 rooms, suites and serviced apartments with uninterrupted views</li>
            <li>7 restaurants & bars, including the renowned Shang Palace</li>
            <li>Direct access to One Galle Face Mall</li>
          </ul>
          <button className="learn-more-btn" onClick={handleLearnMoreClick}>
            Learn More
          </button>
        </div>
        <div className="about-image">
          <img src={aboutImage} alt="Luxury Hotel Pool" />
        </div>
      </div>
    </section>
  );
};

export default About;
