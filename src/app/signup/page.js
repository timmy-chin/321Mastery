"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function handleSignup(event) {
    const data = new FormData(event.currentTarget);
    fetch("/api/users", {
      method: "post",
      body: data,
    });
  }

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
      <form onSubmit={handleSignup} style={{ textAlign: "center" }}>
        <label htmlFor="email">CalPoly Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
        />
        <br />
        <label htmlFor="firstname">Enter your First Name:</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          placeholder="Enter your First Name"
          required
        />
        <br />
        <label htmlFor="lastname">Enter your Last Name:</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Enter your Last Name"
          required
        />
        <br />
        <label htmlFor="password">Confirm Password:</label>
        <input
          type="password"
          id="confirmation"
          name="confirmation"
          placeholder="Enter your password again"
          required
        />
        <br />
        <button type="submit">Sign-Up</button>
      </form>
      <button type="button" onClick={() => router.push("/")}>
        Go Back to Login
      </button>
    </div>
  );
}
