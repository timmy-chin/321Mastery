"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";

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
          

        }}>
        <h1 style={{ fontFamily: "Avenir, sans-serif", fontSize: "38px" }}>Carpool With Me</h1>
        <h3 style={{ fontFamily: "Avenir, sans-serif"}}>Sign-Up</h3>
        <form onSubmit={handleSignup} style={{ textAlign: "left" }}>
          {/* <label htmlFor="email">CalPoly Email:</label> */}
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            required
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
          />
          <br />
          {/* <label htmlFor="password">Password:</label> */}
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
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
          />
          <br />
          <input
            type="password"
            id="confirmation"
            name="confirmation"
            placeholder="Confirm Password"
            required
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
          />
          <br />
          {/* <label htmlFor="firstname">Enter your First Name:</label> */}
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="First Name"
            required
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
          />
          {/* <label htmlFor="lastname">Enter your Last Name:</label> */}
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Last Name"
            required
            style={{
              width: '300px',
              boxSizing: 'border-box',
              border: '2px solid #000',
              borderRadius: '4px',
              fontSize: '16px',
              color: '#000',
              backgroundColor: 'white',
              padding: '12px 20px 12px 12px',
              marginBottom: '0px', 
            }}
          />
          <br />
          
        <div style={{ marginTop: "0px", width: "300px", textAlign: "center"}}>
          <p>
            Have have an account? <Link href="/"> Log-In</Link>
          </p>
        </div>
          <Button type="submit"
          style={{
            width: '300px',
            marginTop: "20px",
            border: '2px solid #000', // Black border
            backgroundColor: '#000', // Solid black background color
            color: '#fff', // Text color (white)
            justifyContent: 'center',
          }}
          >Sign-Up</Button>
        </form>

        
      </div>
      <div
        style={{
          flex: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          paddingRight: "110px",
        }}
      >
        
        <Image src="/image2307.png" width={800} height={1000} />
      </div>
    </div>
  );
}
