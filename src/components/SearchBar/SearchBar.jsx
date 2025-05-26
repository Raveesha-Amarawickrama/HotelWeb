import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = () => {
  const [checkIn, setCheckIn] = useState(() => localStorage.getItem('searchCheckIn') || '2025-05-14');
  const [checkOut, setCheckOut] = useState(() => localStorage.getItem('searchCheckOut') || '2025-05-15');
  const [specialCode, setSpecialCode] = useState(() => localStorage.getItem('searchSpecialCode') || '');
  const [roomGuests, setRoomGuests] = useState(() => localStorage.getItem('searchRoomGuests') || '1 Room, 1 Adult, 0 Children');
  const [results, setResults] = useState(() => {
    const saved = localStorage.getItem('searchResults');
    return saved ? JSON.parse(saved) : [];
  });
  const [searched, setSearched] = useState(false); // Track whether a search has been made

  useEffect(() => {
    localStorage.setItem('searchCheckIn', checkIn);
    localStorage.setItem('searchCheckOut', checkOut);
    localStorage.setItem('searchSpecialCode', specialCode);
    localStorage.setItem('searchRoomGuests', roomGuests);
    localStorage.setItem('searchResults', JSON.stringify(results));
  }, [checkIn, checkOut, specialCode, roomGuests, results]);

  const handleSearch = async () => {
    const requestBody = {
      checkIn,
      checkOut,
      roomGuests: roomGuests.trim(),
      ...(specialCode.trim() && { specialCode: specialCode.trim() }),
    };

    try {
      const response = await fetch('http://localhost:5000/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      setResults(data);
      setSearched(true);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
      setSearched(true);
    }
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <div className="search-row">
          <div className="search-col">
            <label>Check In</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="search-col">
            <label>Check Out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="search-col">
            <label>Rooms & Guests</label>
            <input
              type="text"
              value={roomGuests}
              onChange={(e) => setRoomGuests(e.target.value)}
              className="search-input"
              placeholder="e.g. 2 Rooms, 3 Adults, 1 Child"
            />
          </div>

          <div className="search-col">
            <label>Special Code <span style={{ fontStyle: 'italic' }}>(Optional)</span></label>
            <input
              type="text"
              placeholder="Promo Code"
              value={specialCode}
              onChange={(e) => setSpecialCode(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="search-button-col">
            <button className="search-button" onClick={handleSearch}>
              SEARCH
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {searched && (
        <div className="search-results">
          {results.length > 0 ? (
            results.map((item, index) => (
              <div key={index} className="result-card">
                <h3>{item.roomType}</h3>
                <p>{item.description}</p>
                <p><strong>Price:</strong> {item.price}</p>
              </div>
            ))
          ) : (
            <p className="no-results">No results found. Please try different dates or options.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
