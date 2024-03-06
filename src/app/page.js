"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRouter } from 'next/navigation'


function handleLogin(event){
  const data = new FormData(event.currentTarget);
  fetch('/api/users', {
    method: "get",
    body: data
  }).then(res)
}

export default function Login() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const router = useRouter()

  function reset() {
    setError(false);
    setFormValues({ email: "", password: "" });
  }

  function handleSignin() {
    signIn("normal", { ...formValues, redirect: false }).then((result) => {
      if (!result.error) {
        router.push('/driver_home')
        reset();
      } else {
        setError(true);
      }
    });
  }

  function handleChange({ field, value }) {
    setFormValues({ ...formValues, [field]: value });
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
      <h2>Login</h2>
      <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              value={formValues.email}
              onChange={(e) =>
                handleChange({ field: "email", value: e.target.value })
              }
              variant="standard"
            />
      <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              value={formValues.password}
              onChange={(e) =>
                handleChange({ field: "password", value: e.target.value })
              }
              variant="standard"
            />
      <Button onClick={() => handleSignin()}>Login</Button>
      <div style={{ marginTop: "20px" }}>
        <p>
          Don't have an account? <Link href="/signup"> Sign-Up</Link>
        </p>
      </div>


      {/* <form onSubmit={handleLogin} style={{ textAlign: "center" }}>
        <label htmlFor="email">Email:</label>
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
        <button type="submit">
          {" "}
          <Link href="/driver_home">Login</Link>
        </button>
      </form>
      <div style={{ marginTop: "20px" }}>
        <p>
          Don't have an account? <Link href="/signup"> Sign-Up</Link>
        </p>
      </div> */}
    </div>
  );
}
