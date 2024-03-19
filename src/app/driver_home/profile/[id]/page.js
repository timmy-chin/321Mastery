"use client";

import React from "react";
import { SlArrowLeftCircle } from "react-icons/sl";
import { useState, useEffect } from "react";

export default function Page({params}) {
  const [userData, setUserData] = useState(null); // State to store fetched user data
  const [profile, setProfile] = useState([]);
  const [rating, setRating] = useState(0);
  const [totalRating, setTotalRating] = useState(0);

  // Load profile from id
  useEffect(() => {
    // Get all my posted rides
    const url = "/api/profile?userId="+params.id;
    fetch(url)
      .then((response) => response.ok && response.json())
      .then((profile) => {
        setProfile(profile);
      });
  }, []);

function getAverage(list) {
    // Check if the list is empty
    if (list.length === 0) {
        return 0; // Return 0 for an empty list
    }

    // Calculate the sum of all elements in the list
    var sum = 0;
    for (var i = 0; i < list.length; i++) {
        sum += list[i];
    }

    // Calculate the average
    var average = sum / list.length;
    return average.toFixed(2);
}

  // Get all my rating
  useEffect(() => {
    const url = "/api/rating?driverId="+params.id;
    fetch(url, { method: "get" })
      .then((response) => response.ok && response.json())
      .then((ratingStructs) => {
        const rateValues = ratingStructs.map((ratingStruct, index) => {
          return ratingStruct.rating;
        });
        const averageRating = getAverage(rateValues)
        setRating(averageRating);
        setTotalRating(rateValues.length)
      });
  }, []);



  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("/api/profile", { method: "get" });
        console.log(res.ok);
        if (!res.ok) {
          throw new Error("Failed to fetch data here");
        }
        const data = await res.json();
        setUserData(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Handle error as needed (e.g., show an error message to the user)
      }
    };

    getData(); // Fetch data when the component mounts
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  if (profile.length == 0) {
    return <div></div>;
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <a href="/driver_home">
        <SlArrowLeftCircle size={32} />
      </a>
      <br />
      <strong>Back to Driver Home!</strong>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Driver Profile</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <img
            src="/carpoologo.png"
            alt="Profile Avatar"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              marginRight: "20px",
              border: "2px solid black",
            }}
          />
          <div>
            <h2
              style={{ marginBottom: "10px" }}
            >{`${profile[0]?.firstName} ${profile[0]?.lastName}`}</h2>
            <p>Email: {profile[0]?.email}</p>
            <p>Age: {profile[0].age} years old</p>
            <p>Gender: {profile[0].gender}</p>
            <p>Verified: </p>
            <p>Ratings: {rating}/5 ({totalRating} Ratings)</p>
          </div>
        </div>
        <p style={{ lineHeight: "1.6" }}></p>
      </div>
    </div>
  );
}