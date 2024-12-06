"use client";
import React, { useState } from 'react';
import { SlArrowLeftCircle } from "react-icons/sl";
import axios from 'axios';


const sendEmail = async () => {
  try {
    const response = await axios.post('http://localhost:4000/send-email', null);
    alert(response.data);
  } catch (error) {
    console.error(error);
    alert('Failed to send email');
  }
};

export default function UploadLicense() {
  const [licenseImage, setLicenseImage] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = (event) => {
    const imageFile = event.target.files[0];
    setLicenseImage(URL.createObjectURL(imageFile));
  };

  function handleVerify(event) {
    setUploaded(true)
    fetch("/api/verify", {
      method: "post",
      body: JSON.stringify({}),
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
        color: "black",
      }}
    >
      <a href="/driver_home">
        <SlArrowLeftCircle size={32} />
      </a>
      <br />
      <strong>Back to Driver Home!</strong>
      <h1>Upload Driver's License</h1>
      <div>
      <button onClick={sendEmail}>Send Email</button>
    </div>
      {
        uploaded == false ?
        <div>
            <div style={{ borderBottom: "1px solid black", marginBottom: "20px" }}></div>
            <div style={{ marginBottom: "20px" }}>
              <input type="file" accept="image/*" onChange={handleUpload} />
            </div>
            {licenseImage && (
              <img
                src={licenseImage}
                alt="Driver's License"
                style={{ width: "200px", height: "200px", marginBottom: "20px" }}
              />
            )}
            {!licenseImage && (
              <img
                src={"uploadimage.jpeg"}
                alt="Placeholder"
                style={{ width: "200px", height: "200px", marginBottom: "20px" }}
              />
            )}
            <button disabled={!licenseImage} onClick={handleVerify}>
              Upload
            </button>
        </div>
        :
        <h3>Thanks for submitting Verification! We will process it soon. Check your profile for status!</h3>
      }
    </div>
  );
}