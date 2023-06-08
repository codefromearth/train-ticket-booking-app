// App.js

import React, { useState } from 'react';
import Coach from './component/Coach';
import seatDatabase from './component/Seatdatabae';
import './App.css'
const App = () => {
  const [seats, setSeats] = useState(seatDatabase);
  // const [bookingStatus, setBookingStatus] = useState('');

  const reserveSeats = (numSeats) => {
    let availableSeats = seats.filter((seat) => seat.isAvailable);

    if (availableSeats.length >= numSeats) {
      // Attempt to book consecutive seats in one row
      let consecutiveSeats = findConsecutiveSeats(numSeats, availableSeats);

      if (consecutiveSeats.length === numSeats) {
        // Book consecutive seats
        consecutiveSeats.forEach((seat) => {
          seat.isAvailable = false;
        });
        // setBookingStatus(`Successfully booked ${numSeats} seats.`);
        setSeats([...seats]);
        alert(`Successfully booked ${numSeats} seats.`);

        return;
      }
    }

    // If consecutive seats are not available, book nearby seats
    let bookedSeats = bookNearbySeats(numSeats, availableSeats);
    if (bookedSeats.length === numSeats) {
      // setBookingStatus(`Successfully booked ${numSeats} seats.`);
            alert(`Successfully booked ${numSeats} seats.`);

    } else {
      // setBookingStatus(`Failed to book ${numSeats} seats.`);
       alert(`Failed to book ${numSeats} seats.`);
    }

    setSeats([...seats]);
  };

  const findConsecutiveSeats = (numSeats, availableSeats) => {
    let consecutiveSeats = [];
    for (let i = 0; i < availableSeats.length; i++) {
      if (consecutiveSeats.length === numSeats) {
        break;
      }
      if (consecutiveSeats.length === 0) {
        consecutiveSeats.push(availableSeats[i]);
      } else {
        let prevSeatIndex = seats.indexOf(consecutiveSeats[consecutiveSeats.length - 1]);
        let currentSeatIndex = seats.indexOf(availableSeats[i]);
        if (currentSeatIndex === prevSeatIndex + 1) {
          consecutiveSeats.push(availableSeats[i]);
        } else {
          consecutiveSeats = [];
          consecutiveSeats.push(availableSeats[i]);
        }
      }
    }
    return consecutiveSeats;
  };

  const bookNearbySeats = (numSeats, availableSeats) => {
    let bookedSeats = [];
    for (let i = 0; i < numSeats; i++) {
      if (i < availableSeats.length) {
        availableSeats[i].isAvailable = false;
        bookedSeats.push(availableSeats[i]);
      } else {
        break;
      }
    }
    return bookedSeats;
  };

  return (
    <div className="app">
      <h1>TRAIN SEAT RESERVATION</h1>
      <div className='seatbuttons'>
        <button onClick={() => reserveSeats(1)}>Book 1 Seat</button>
        <button onClick={() => reserveSeats(2)}>Book 2 Seats</button>
        <button onClick={() => reserveSeats(3)}>Book 3 Seats</button>
         <button onClick={() => reserveSeats(4)}>Book 4 Seat</button>
        <button onClick={() => reserveSeats(5)}>Book 5 Seats</button>
        <button onClick={() => reserveSeats(6)}>Book 6 Seats</button>
        <button onClick={() => reserveSeats(7)}>Book 7 Seats</button>
        
        {/* Add more buttons for different seat quantities if needed */}
      </div>
      <Coach seats={seats} />
      {/* <div className="booking-status">{bookingStatus}</div> */}
      
    </div>
  );
};

export default App;
