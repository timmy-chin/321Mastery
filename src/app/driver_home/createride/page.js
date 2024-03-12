"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { SlArrowLeftCircle } from "react-icons/sl";

export default function Home() {
  const [startLoc, setStartLoc] = useState("");
  const [endLoc, setEndLoc] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [posted, setPosted] = useState(false);

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
    if (
      startLoc &&
      startLoc.length &&
      endLoc &&
      endLoc.length &&
      date &&
      date.length &&
      time &&
      time.length
    ) {
      fetch("/api/rideposting", {
        method: "post",
        body: JSON.stringify({
          startLoc: startLoc,
          endLoc: endLoc,
          date: date,
          time: time,
          seats: seats,
          price: price,
          driverName: name,
        }),
      });
      setPosted(true);
    }
  }

  // Get username of the driver making the post
  fetch("/api/getProfile?userid=getID", { method: "get" })
    .then((response) => response.ok && response.json())
    .then((Id) => {
      fetch("/api/getProfile?userid=" + Id, { method: "get" })
        .then((response) => response.ok && response.json())
        .then((profiles) => {
          const profile = profiles[0];
          setName(profile.firstName + " " + profile.lastName);
        });
    });

  return (
    <>
      <a href="/driver_home">
        <SlArrowLeftCircle size={32} />
      </a>
      <br />
      <strong>Back to Driver Home!</strong>
      <h1>Create a Ride</h1>
      <p>Start Location</p>
      <input
        type="text"
        value={startLoc}
        onChange={startLocChanged}
        size="50"
      />

      <p>End Location</p>
      <input type="text" value={endLoc} onChange={endLocChanged} size="50" />

      <p></p>

      <p>Date</p>
      <label>
        <input type="text" value={date} onChange={dateChanged} />
      </label>

      <p>Time</p>
      <label>
        <input type="text" value={time} onChange={timeChanged} />
        <input type="checkbox" />
        AM
        <input type="checkbox" />
        PM
      </label>

      <p></p>

      <label>
        <input type="checkbox" />
        Reoccuring?
      </label>

      <p></p>

      <label>
        <input type="checkbox" /> <input type="checkbox" />{" "}
        <input type="checkbox" /> <input type="checkbox" />{" "}
        <input type="checkbox" /> <input type="checkbox" />{" "}
        <input type="checkbox" />
      </label>

      <p> S M T W Th F Sat</p>

      <p>Seat(s)</p>
      <input type="text" value={seats} onChange={seatsChanged} />

      <p>Price (USD)</p>
      <input type="text" value={price} onChange={priceChanged} />

      <p></p>

      <button type="button" onClick={postRide}>
        Post Ride
      </button>
      <a>{posted ? " Posted!" : ""}</a>
    </>
  );
}
