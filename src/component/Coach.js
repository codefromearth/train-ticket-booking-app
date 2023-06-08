// Coach.js

import React from 'react';

const Coach = ({ seats }) => {
  return (
    <div className="coach">
      {seats.map((seat, index) => (
        <div
          key={index}
          className={`seat ${seat.isAvailable ? 'available' : 'booked'}`}
        >
          {seat.seatNumber}
        </div>
      ))}
    </div>
  );
};

export default Coach;
