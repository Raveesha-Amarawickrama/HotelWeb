import React, { useEffect, useState } from "react";
import "./Gallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("Failed to fetch gallery images", err));
  }, []);

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Photos & Videos</h2>
      <div className="gallery-grid">
        {images.map((url, index) => (
          <div key={index} className="gallery-item">
            <img src={url} alt={`Gallery ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
