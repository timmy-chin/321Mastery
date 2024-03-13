import React from "react";
import { SlArrowLeftCircle } from "react-icons/sl";

const MessagingPage = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <a href="/rider_home">
        <SlArrowLeftCircle size={32} />
      </a>
      <br />
      <strong>Back to Rider Home!</strong>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Messaging</h1>
        <div
          style={{
            padding: "10px",
            border: "1px solid black",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              src="/carpoologo.png"
              alt="User Avatar"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginRight: "10px",
                border: "2px solid black",
              }}
            />
            <strong>Jaime Nguyen:</strong>
          </div>
          <p style={{ marginBottom: "10px" }}>On the way!</p>
        </div>
        <div
          style={{
            padding: "10px",
            border: "1px solid black",
            borderRadius: "5px",
            marginBottom: "20px",
            textAlign: "right",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginBottom: "10px",
            }}
          >
            <strong>Peter Almeida:</strong>
            <img
              src="/carpoologo.png"
              alt="User Avatar"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginLeft: "10px",
                border: "2px solid black",
              }}
            />
          </div>
          <p style={{ marginBottom: "10px" }}>Sounds good!</p>
        </div>
        <form style={{ display: "flex", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Type your message..."
            style={{
              flex: "1",
              padding: "8px",
              marginRight: "10px",
              border: "1px solid black",
              borderRadius: "5px",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "black",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessagingPage;
