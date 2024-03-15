"use client";

import { useState, useEffect } from "react";
import React from "react";
import { SlArrowLeftCircle } from "react-icons/sl";

export default function Page() {
  const [posting, setPosting] = useState([]);
  const [myRides, setMyRides] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [declined, setDeclined] = useState([]);
  const [started, setStarted] = useState([]);
  const [ended, setEnded] = useState([]);
  const [rating, setRating] = useState(0);

  const handleRate = (value) => {
    setRating(value);
  };

  const pfpList = [
    "https://t4.ftcdn.net/jpg/00/64/67/27/240_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg",
  ];

    // Load all my ride postings and the name of the riders of requested for them
    useEffect(() => {
      // Get all my posted rides
      const url = "/api/rideposting";
      fetch(url)
        .then((response) => response.ok && response.json())
        .then((posts) => {
          setPosting(posts);
        });
    }, []);


  // Get all requeseted ride posting
  useEffect(() => {
    const url = "/api/request?riderId=all";
    fetch(url, { method: "get" })
      .then((response) => response.ok && response.json())
      .then((requests) => {
        const request = requests.map((request, index) => {
          return request.postId;
        });
        const url = "/api/rideposting";
        fetch(url, { method: "get" })
          .then((response) => response.ok && response.json())
          .then((post) => {
            const myRideResult = post.map((p, index) => {
              if (request.includes(p.id)) {
                return p;
              }
            });
            setMyRides(myRideResult);
          });
      });
  }, []);

  // Get all my accepted request
  useEffect(() => {
    const url = "/api/accepted";
    fetch(url, { method: "get" })
      .then((response) => response.ok && response.json())
      .then((accepted) => {
        const result = accepted.map((accept, index) => {
          return accept.postId;
        });
        result && setAccepted(result);
      });
  }, []);

  // Get all my declined request
  useEffect(() => {
    const url = "/api/declined";
    fetch(url, { method: "get" })
      .then((response) => response.ok && response.json())
      .then((declined) => {
        const result = declined.map((decline, index) => {
          return decline.postId;
        });
        result && setDeclined(result);
      });
  }, []);

    // Load all started ride
    useEffect(() => {
      const url = "/api/driveStatus?start=all";
      fetch(url)
        .then((response) => response.ok && response.json())
        .then((allStatus) => {
          const startPromises = allStatus.map((status) => {
            return status.postId;
          });
            return Promise.all(startPromises);
        })
        .then((updatedResult) => {
          setStarted(updatedResult);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);

    // Load all ended ride
    useEffect(() => {
      const url = "/api/driveStatus?end=all";
      fetch(url)
        .then((response) => response.ok && response.json())
        .then((allStatus) => {
          const endPromises = allStatus.map((status) => {
            return status.postId;
          });
            return Promise.all(endPromises);
        })
        .then((updatedResult) => {
          setEnded(updatedResult);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);


function getStartedRide() {
  for (let request of myRides) {
      if (started.includes(request.id) && !ended.includes(request.id) && accepted.includes(request.id)) {
          return request.id;
      } else {
          return -1;
      }
  }
}

function getMostRecentEndedRide() {
  const myRequests = myRides.map((ride, index) => {
    return ride.id;
  });
  var recentEnd = -1;
  for (let end of ended) {
      if (myRequests.includes(end) && accepted.includes(end)) {
          recentEnd = end;
      }
  }
  return recentEnd;
}

function displayActiveRide(postId) {
    var index = 0
    for (let post of posting) {
        if (post.id == postId){
            return     <div>
            <img src={pfpList[0]} width="100" height="100"></img>
            <h3 key={index}>Driver: {post.driverName}</h3>
            <h5 key={index}>Pick Up Location: {post.startLoc}</h5>
            <h5 key={index}>Destination: {post.endLoc}</h5>
            <h5 key={index}>Date: {post.date}</h5>
            <h5 key={index}>Time: {post.time}</h5>
          </div>
        }
        index = index + 1
    }
}

function displayRateMyRidePage(postId){
  var index = 0
  for (let post of posting) {
      if (post.id == postId){
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
            src="/arrivalimage.png"
            alt="Arrival"
            style={{ width: "200px", height: "200px", marginBottom: "20px" }}
          />
          <h2>You have arrived at {post.endLoc}</h2>
          <h4>How was your ride with {post.driverName}?</h4>
          <div style={{ marginBottom: "20px" }}>
            {[...Array(5)].map((_, index) => (
              <button key={index} onClick={() => handleRate(index + 1)}>
                {index < rating ? "★" : "☆"}
              </button>
            ))}
          </div>
          <p>Miss something? Send {post.driverName} a message</p>
          <button>Send Message</button>
        </div>
        );
      }
      index = index + 1
  }
}


  return (
    <div>
      <a href="/rider_home">
        <SlArrowLeftCircle size={32} />
      </a>
      <br />
      <strong>Back to Rider Home!</strong>
      <h2>Your Active Ride</h2>
      {
        posting.length != 0 ? 
            getStartedRide() != -1 ? 
              displayActiveRide(getStartedRide()) 
              : 
              getMostRecentEndedRide() != -1 ?
                displayRateMyRidePage(getMostRecentEndedRide())
                :
                "No Active Ride"
            : 
            "Loading"
      }
    </div>
  );
}
