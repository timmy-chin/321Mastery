"use client";
import React, { useState } from 'react';

export default function Home() {
  const [rating, setRating] = useState(0);

  const handleRate = (value) => {
    setRating(value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>Carpool With Me</h1>
      <img
        src="/arrivalimage.png"
        alt="Arrival"
        style={{ width: "200px", height: "200px", marginBottom: "20px" }}
      />
      <h2>You have arrived at your destination</h2>
      <div style={{ marginBottom: "20px" }}>
        {[...Array(5)].map((_, index) => (
          <button key={index} onClick={() => handleRate(index + 1)}>
            {index < rating ? "★" : "☆"}
          </button>
        ))}
      </div>
      <p>Miss something? Send your driver a message</p>
      <button>Send Message</button>
    </div>
  );
}