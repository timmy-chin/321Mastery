"use client";

import { useState, useEffect } from "react";
import { SlArrowLeftCircle } from "react-icons/sl";

export default function Page() {
  const [myRides, setMyRides] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [declined, setDeclined] = useState([]);

  const pfpList = [
    "https://t4.ftcdn.net/jpg/00/64/67/27/240_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg",
  ];

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

  // Get status of accpeted or declined
  function getStatus(postId) {
    if (accepted.includes(postId)) {
      return <a>Accepted</a>;
    } else if (declined.includes(postId)) {
      return <a>Declined</a>;
    } else {
      return <a>Pending Response</a>;
    }
  }

  const listAllRides = myRides.map((post, index) => (
    <div>
      {post != null ? ( // if
        <div>
          <img src={pfpList[0]} width="100" height="100"></img>
          <h3 key={index}>Driver: {post.driverName}</h3>
          <h5 key={index}>Pick Up Location: {post.startLoc}</h5>
          <h5 key={index}>Destination: {post.endLoc}</h5>
          <h5 key={index}>Date: {post.date}</h5>
          <h5 key={index}>Time: {post.time}</h5>
          <h5 key={index}>Seats: {post.seats}</h5>
          <h5 key={index}>Price: {post.price}</h5>
          <h5>Status: {getStatus(post.id)}</h5>
          <p> </p>
        </div>
      ) : (
        // else
        " "
      )}
    </div>
  ));
  return (
    <div>
      <a href="/rider_home">
        <SlArrowLeftCircle size={32} />
      </a>
      <br />
      <strong>Back to Rider Home!</strong>
      <h2>Your Requested Rides</h2>
      {myRides.length != 0 ? listAllRides : <h4>Loading Rides...</h4>}
    </div>
  );
}
