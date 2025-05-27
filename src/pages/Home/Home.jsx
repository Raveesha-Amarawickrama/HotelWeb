import React, { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import About from '../../components/AboutSection/About';
import FacilitiesSection from '../../components/FacilitiesSection/FacilitiesSection';
import AuthContext from '../../context/AuthContext.jsx';
import './Home.css';
import hotelVideo from '../../assets/hotelbg.mp4';
import SearchBar from '../../components/SearchBar/SearchBar';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const videoRef = useRef(null);

  useEffect(() => {
    // Autoplay video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="home-page">
      <Header />
      
      <section className="hero-section">
        {/* Background Video */}
        <div className="video-container">
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline
            className="background-video"
          >
            <source src={hotelVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <h1>shangri-la colombo</h1>
          <p>A personal tropical sanctuary set within the heart of the city</p>
        </div>
        
        <SearchBar />
      </section>

      <About />
      <FacilitiesSection />
      <Footer />
    </div>
  );
};

export default Home;