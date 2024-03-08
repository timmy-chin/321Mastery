"use client";
import React, { useState } from 'react';

export default function UploadLicense() {
  const [licenseImage, setLicenseImage] = useState(null);

  const handleUpload = (event) => {
    const imageFile = event.target.files[0];
    setLicenseImage(URL.createObjectURL(imageFile));
  };

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
      <h1>Upload Driver's License</h1>
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
      <button disabled={!licenseImage} onClick={() => console.log("Upload")}>
        Upload
      </button>
    </div>
  );
}