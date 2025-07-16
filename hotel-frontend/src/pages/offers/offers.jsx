import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Offers.css';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      // Replace this with your actual API URL
      const response = await axios.get('/api/offers');
      setOffers(response.data); // Assuming response.data is an array of offers
    } catch (err) {
      console.error('Error fetching offers:', err);
      setError('Failed to load offers. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="offers-loading">Loading offers...</div>;
  if (error) return <div className="offers-error">{error}</div>;

  return (
    <div className="offers-container">
      <h1 className="offers-title">Offers</h1>
      <div className="offers-grid">
        {offers.map((offer) => (
          <div key={offer.id} className="offer-card">
            <div className="offer-image-container">
              <img src={offer.image} alt={offer.title} className="offer-image" />
              <div className="offer-tags">
                {offer.tags.map((tag, index) => (
                  <span key={index} className="offer-tag">{tag}</span>
                ))}
              </div>
            </div>
            <h3 className="offer-title">{offer.title}</h3>
            <p className="offer-description">{offer.description}</p>
            {offer.price && (
              <div className="offer-price">
                From {offer.currency} {offer.price} {offer.priceUnit}
              </div>
            )}
            <button className="view-details-btn">View Details</button>
          </div>
        ))}
      </div>
      <div className="view-all-container">
        <a href="/offers" className="view-all-link">View All</a>
      </div>
    </div>
  );
};

export default Offers;
