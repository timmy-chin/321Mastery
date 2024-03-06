"use client";
import { Box } from "@mui/material";
import Link from "next/link";
import { Button } from "@mui/material";
import MyMap from "./map";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1>Welcome Rider!</h1>
      <p>
        This is the rider homepage! Click on an option to continue or logout!
      </p>
      {/* Button container */}
      <Box
        sx={{
          display: "flex", // Set display to flex
          flexDirection: "row", // Align items horizontally
          gap: "20px", // Add gap between buttons
          marginBottom: "20px", // Add margin to the bottom
        }}
      >
        {/*Links*/}

        <Button
          component={Link}
          href="/findride"
          sx={{
            fontWeight: 700,
            width: "200px",
            height: "50px",
            backgroundColor: "white",
            color: "black",
            border: "2px solid black",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          Find Rides
        </Button>

        <Button
          //component={Link}
          //href="/driver_home/active"
          sx={{
            fontWeight: 700,
            width: "200px",
            height: "50px",
            backgroundColor: "white",
            color: "black",
            border: "2px solid black",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          Active Rides
        </Button>

        <Button
          component={Link}
          href="/rider_home/message"
          sx={{
            fontWeight: 700,
            width: "200px",
            height: "50px",
            backgroundColor: "white",
            color: "black",
            border: "2px solid black",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          Messaging
        </Button>

        <Button
          component={Link}
          href="/rider_home/profile"
          sx={{
            fontWeight: 700,
            width: "200px",
            height: "50px",
            backgroundColor: "white",
            color: "black",
            border: "2px solid black",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          Profile
        </Button>
      </Box>
      <MyMap />
    </Box>
  );
}
