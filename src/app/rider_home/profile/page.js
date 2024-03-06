import React from "react";

const ProfilePage = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Profile</h1>
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
            <h2 style={{ marginBottom: "10px" }}>Peter Almeida</h2>
            <p>Email: peterluvsjaime@example.com</p>
            <p>Location: New York City</p>
            <p>Phone number: 8188188181</p>
            {/* Add more profile information here */}
          </div>
        </div>
        <p style={{ lineHeight: "1.6" }}></p>
      </div>
    </div>
  );
};

export default ProfilePage;
