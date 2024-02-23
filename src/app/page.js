import Image from "next/image";
import Link from "next/link";

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
      <h2>Login</h2>
      <form style={{ textAlign: "center" }}>
        <label htmlFor="username">Username:</label>
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
        <button type="submit">
          {" "}
          <Link href="/driver_home">Login</Link>
        </button>
      </form>
      <div style={{ marginTop: "20px" }}>
        <p>
          Don't have an account? <Link href="/signup"> Sign-Up</Link>
        </p>
      </div>
    </div>
  );
}
