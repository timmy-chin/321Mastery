"use client";
import Image from "next/image";

export default function Home() {
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
        src="/carpoologo.png"
        alt="Carpool Logo"
        style={{ width: "150px", height: "150px", marginBottom: "20px" }}
      />
      <h2>Sign-Up</h2>
      <form style={{ textAlign: "center" }}>
        <label htmlFor="username">CalPoly Email:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          required
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          required
        />
        <br />
        <label htmlFor="firstname">Enter your First Name:</label>
        <input
          type="text"
          id="firstname"
          placeholder="Enter your First Name"
          required
        />
        <br />
        <label htmlFor="lastname">Enter your Last Name:</label>
        <input
          type="text"
          id="lastname"
          placeholder="Enter your Last Name"
          required
        />
        <br />
        <label htmlFor="password">Confirm Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password again"
          required
        />
        <br />
        <button type="submit">Sign-Up</button>
      </form>
    </div>
  );
}
