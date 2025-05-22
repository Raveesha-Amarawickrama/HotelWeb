import React from 'react';
import './FacilitiesSection.css';

const FacilitiesSection = () => {
  const facilitiesCategories = [
    {
      title: 'Accommodation Facilities',
      iconClass: 'fa-bed',
      items: [
        'Luxury Suites',
        'Family Rooms',
        'Private Villas',
        'Royal Suites',
        'Standard Rooms',
        'Deluxe Rooms'
      ]
    },
    {
      title: 'Food & Beverages',
      iconClass: 'fa-utensils',
      items: [
        'Main Restaurant',
        'Sky Lounge',
        'Pool Bar',
        'BBQ Corner',
        'Room Service'
      ]
    },
    {
      title: 'Leisure & Wellness',
      iconClass: 'fa-spa',
      items: [
        'Swimming Pool (Indoor/Outdoor)',
        'Spa & Wellness Center',
        'Fitness Center',
        'Tennis / Sports Arena',
        'Kids Play Area',
        'Yoga & Meditation'
      ]
    },
    {
      title: 'Transport & Access',
      iconClass: 'fa-car',
      items: [
        'Airport Shuttle Service',
        'Private Car Rental',
        'Parking',
        'Tour Service',
        'Taxi Service'
      ]
    },
    {
      title: 'Business & Events',
      iconClass: 'fa-briefcase',
      items: [
        'Conference Hall',
        'Business Center',
        'Meeting Rooms',
        'Wedding Venue',
        'Event Planning'
      ]
    },
    {
      title: 'Special Services',
      iconClass: 'fa-concierge-bell',
      items: [
        '24/7 Reception',
        'Concierge Service',
        'Butler Service',
        'Childcare',
        'Laundry'
      ]
    }
  ];

  return (
    <section className="facilities-section" id="facilities">
      <div className="facilities-overlay"></div>
      <div className="facilities-content">
        <h2>Our Facilities</h2>
        <div className="facilities-grid">
          {facilitiesCategories.map((category, index) => (
            <div className="facility-card" key={index}>
              <div className="facility-header">
                <i className={`fas ${category.iconClass}`}></i>
                <h3>{category.title}</h3>
              </div>
              <ul className="facility-list">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;