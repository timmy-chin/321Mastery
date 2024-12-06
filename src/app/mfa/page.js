"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { Button } from '@mui/material';

export default function MFA() {

    const [passcode, setPasscode] = useState("");
    const router = useRouter()
    const valid_passcode = Math.floor(100000 + Math.random() * 900000);

    function passcodeChanged(event) {
        setPasscode(event.target.value);
    }
    
    function checkPasscode(event) {
        console.log(`This is input: ${passcode}`)
        console.log(`This is valid: ${valid_passcode}`)
        if (Number(passcode) === valid_passcode){
            router.push("/driver_home")
        }
        else{
            alert("Wrong OTP Passcode, Try Again")
        }
    }

    const sendEmail = async () => {
        try {
          const response = await axios.post('http://localhost:4000/send-email', {valid_passcode: valid_passcode});
          alert(response.data);
        } catch (error) {
          console.error(error);
          alert('Failed to send email');
        }
      };

  return (
    <div
    style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "black",
      }}
    >
      <br />
      <h1>Enter One Time Passcode</h1>
      <div>
      <input
            placeholder="Enter OTP"
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
            type="text"
            value={passcode}
            onChange={passcodeChanged}
            size="50"
          ></input>
          <p></p>
      <Button
        onClick={checkPasscode}
        style={{
          width: '300px',
          marginTop: "20px",
          border: '2px solid #000', // Black border
          backgroundColor: '#000', // Solid black background color
          color: '#fff', // Text color (white)
          justifyContent: 'center',
        }}
      >Submit</Button>
      <p></p>
            <Button
        onClick={sendEmail}
        style={{
          width: '300px',
          marginTop: "20px",
          border: '2px solid #000', // Black border
          backgroundColor: '#000', // Solid black background color
          color: '#fff', // Text color (white)
          justifyContent: 'center',
        }}
      >Send OTP to Email</Button>
    </div>
    </div>
  );
}