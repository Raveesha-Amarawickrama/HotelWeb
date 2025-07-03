import React, { useState, useEffect } from 'react';
import './Offers.css';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch offers from API
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      // In a real application, you would fetch data from your API
      // For now, we'll use mock data
      const mockOffers = [
        {
          id: 1,
          title: 'Eat Play Love with Shangri-La',
          description: 'One stay. Three paths. Find your pleasure in Colombo this summer. Eat. Play is. Love.',
          price: '68.01',
          currency: 'LKR',
          priceUnit: 'Average Per Night',
          tags: ['Stay', 'Breakfast Included', 'Gourmet Discovery'],
          image: '/assets/offers/colombo-street.jpg'
        },
        {
          id: 2,
          title: 'Members Online Exclusive Rate',
          description: 'Unlock exclusive member rates at Shangri-La Colombo.',
          price: '47.39',
          currency: 'LKR',
          priceUnit: 'Average Per Night',
          tags: ['Stay', 'Member Exclusive'],
          image: '/assets/offers/member-lounge.jpg'
        },
        {
          id: 3,
          title: 'A Taste of Love for Mum',
          description: 'Treat Mum to thoughtfully curated dining experiences this Mother\'s Day.',
          price: null, // No price for this offer
          currency: null,
          priceUnit: null,
          tags: ['Wine & Dine'],
          image: '/assets/offers/high-tea.jpg'
        }
      ];
      
      setOffers(mockOffers);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching offers:', err);
      setError('Failed to load offers. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="offers-loading">Loading offers...</div>;
  }

  if (error) {
    return <div className="offers-error">{error}</div>;
  }

  return (
    <div className="offers-container">
      <h1 className="offers-title">Offers</h1>
      
      <div className="offers-grid">
        {offers.map(offer => (
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