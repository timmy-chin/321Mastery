"use client"

import Image from 'next/image'
import { useState, useEffect } from 'react';


export default function Home() {
  const [startLoc, setStartLoc] = useState('');
  const [endLoc, setEndLoc] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [seats, setSeats] = useState('');
  const [price, setPrice] = useState('');

  function startLocChanged(event) {
    setStartLoc(event.target.value);
  }

  function endLocChanged(event) {
    setEndLoc(event.target.value);
  }

  function dateChanged(event) {
    setDate(event.target.value);
  }

  function timeChanged(event) {
    setTime(event.target.value);
  }

  function seatsChanged(event) {
    setSeats(event.target.value);
  }

  function priceChanged(event) {
    setPrice(event.target.value);
  }

  function postRide() {
    if(startLoc && startLoc.length && endLoc && endLoc.length && date && date.length && time && time.length) {
        fetch("/api/rideposting", { method: "post", body: JSON.stringify({startLoc: startLoc, endLoc: endLoc, date: date, time: time, seats: seats, price: price}) });
    }
  }
  
  return (
    <>
      <h1>Create a Ride</h1>
      <p>
        Start Location
      </p>
      <input 
      type="text"
      value={startLoc}
      onChange={startLocChanged}
      size = "50"
      />

      <p>
        End Location
      </p>
      <input 
      type="text"
      value={endLoc}
      onChange={endLocChanged}
      size  = "50"
      />

      <p></p>

      <p>Date</p>
      <label>
      <input
      type="text"
      value={date}
      onChange={dateChanged}
      />
      </label>

      <p>Time</p>
      <label>
      <input
      type="text"
      value={time}
      onChange={timeChanged}
      />
      <input type="checkbox"/>AM
      <input type="checkbox"/>PM
      </label>

      <p></p>


      <label><input type="checkbox"/>Reoccuring?</label>

      <p></p>

      <label><input type="checkbox"/>  <input type="checkbox"/>  <input type="checkbox"/>  <input type="checkbox"/>  <input type="checkbox"/>  <input type="checkbox"/>  <input type="checkbox"/></label>

      <p>  S M T W Th F Sat</p>

      <p>Seat(s)</p>
      <input 
      type="text"
      value={seats}
      onChange={seatsChanged}    
      />

      <p>Price (USD)</p>
      <input
      type="text"
      value={price}
      onChange={priceChanged}   
      />

      <p></p>

      <button type="button" onClick={postRide}>Post Ride</button>

    </>
  )
}
