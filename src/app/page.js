"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRouter } from 'next/navigation'

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
        flexDirection: "row",
        height: "100vh",
      }}
    >
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          justifyContent: "center",
          padding: "0 20px", 
          paddingLeft: "80px",
          

        }}
      >
      <h1 style={{ fontFamily: "Avenir, sans-serif", fontSize: "38px" }}>Carpool With Me</h1>
      
      <h3 style={{ fontFamily: "Avenir, sans-serif"}}>Login</h3>
    

      <form>
        <input
          type="text"
          name="email"
          placeholder="Email Address"
          style={{
            width: '300px',
            boxSizing: 'border-box',
            border: '2px solid #000',
            borderRadius: '4px',
            fontSize: '16px',
            color: '#000',
            backgroundColor: 'white',
            padding: '12px 20px 12px 12px',
            marginBottom: '20px', 
          }}
          value={formValues.email}
          onChange={(e) => handleChange({field: 'email', value: e.target.value})}
        />
      </form>
      
      <form>
        <input
          type="password"
          name="password"
          placeholder="Password"
          style={{
            width: '300px',
            boxSizing: 'border-box',
            border: '2px solid #000',
            borderRadius: '4px',
            fontSize: '16px',
            color: '#000',
            backgroundColor: 'white',
            padding: '12px 20px 12px 12px',
            marginBottom: '-40px', 
          }}
          value={formValues.password}
          onChange={(e) => handleChange({ field: "password", value: e.target.value })}
        />
      </form>
    
      
      <div style={{ marginTop: "5px", width: "300px", textAlign: "center"}}>
        <p>
          Don't have an account? <Link href="/signup"> Sign-Up</Link>
        </p>
      </div>
      <Button
        onClick={() => handleSignin()}
        style={{
          width: '300px',
          marginTop: "20px",
          border: '2px solid #000', // Black border
          backgroundColor: '#000', // Solid black background color
          color: '#fff', // Text color (white)
          justifyContent: 'center',
        }}
      >Login</Button>
      </div>

      <div
        style={{
          flex: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          paddingRight: "100px",
        }}
      >
        
        <Image src="/loginImage.png" width={800} height={1000} />
      </div>
    </div>
  );
}
