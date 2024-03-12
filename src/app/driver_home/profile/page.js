"use client";

import React from "react";
import { useState, useEffect } from "react";
import { SlArrowLeftCircle } from "react-icons/sl";
import Link from "next/link";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null); // State to store fetched user data

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

  if (!userData) {
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
            >{`${userData?.firstName} ${userData?.lastName}`}</h2>
            <p>Email: {userData?.email}</p>
            <p>More data coming soon...</p>
            {/* Add more profile information here */}
          </div>
        </div>
        <p style={{ lineHeight: "1.6" }}></p>
      </div>
    </div>
  );
};

export default ProfilePage;
