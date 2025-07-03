import React, { useEffect, useState } from "react";
import "./Rooms.css";

const Rooms = () => {
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    fetch("/api/rooms")
      .then((res) => res.json())
      .then((data) => setRoomData(data))
      .catch((err) => console.error("Failed to load room data", err));
  }, []);

  if (!roomData) return <div className="loading">Loading...</div>;

  const { title, subtitle, description, features, amenities, price, image } = roomData;

  return (
    <div className="rooms-container">
      <img src={image} alt="Room" className="room-banner" />
      <div className="room-content">
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <p>{description}</p>

        <section>
          <h4>Features</h4>
          <ul>
            {features.map((feat, i) => <li key={i}>{feat}</li>)}
          </ul>
        </section>

        <section>
          <h4>Amenities</h4>
          <div className="amenity-group">
            <h5>Bath & Personal Care</h5>
            <ul>{amenities.bath.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </div>
          <div className="amenity-group">
            <h5>Media & Entertainment</h5>
            <ul>{amenities.media.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </div>
          <div className="amenity-group">
            <h5>Office Equipment & Stationery</h5>
            <ul>{amenities.stationary.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </div>
          <div className="amenity-group">
            <h5>Refreshments</h5>
            <ul>{amenities.refreshments.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </div>
        </section>

        <section className="child-policy">
          <h4>Children's Meal Plan</h4>
          <p>{amenities.children}</p>
        </section>

        <div className="price-box">
          <strong>From {price} / night</strong>
          <button>Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
