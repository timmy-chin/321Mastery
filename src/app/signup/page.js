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
            placeholder="Enter your email"
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
            placeholder="Enter your password"
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
            placeholder="Enter your First Name"
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
          {/* <label htmlFor="lastname">Enter your Last Name:</label> */}
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Enter your Last Name"
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
          {/* <label htmlFor="confirmation">Confirm Password:</label> */}
          <input
            type="password"
            id="confirmation"
            name="confirmation"
            placeholder="Enter your password again"
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
          <button type="submit">Sign-Up</button>
        </form>
        <button type="button" onClick={() => router.push("/")}>
          Go Back to Login
        </button>
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
