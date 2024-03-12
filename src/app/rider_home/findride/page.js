"use client";

import { useState, useEffect } from "react";
import { checkLoggedIn } from "@/lib/auth";
import { SlArrowLeftCircle } from "react-icons/sl";

function Home() {
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [recur, setRecur] = useState(false);
  const [posting, setPosting] = useState([]);

  const pfpList = [
    "https://t4.ftcdn.net/jpg/00/64/67/27/240_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg",
  ];

  function locationChanged(event) {
    setLocation(event.target.value);
  }

  function destinationChanged(event) {
    setDestination(event.target.value);
  }

  function dateChanged(event) {
    setDate(event.target.value);
  }

  function timeChanged(event) {
    setTime(event.target.value);
  }

  function recurChanged(event) {
    setRecur(event.target.value);
  }

  function searchHandler() {
    const url =
      "/api/rideposting?" +
      "startLoc=" +
      location +
      "&endLoc=" +
      destination +
      "&date=" +
      date +
      "&time=" +
      time;
    console.log("this is url: " + url);
    fetch(url, { method: "get" })
      .then((response) => response.ok && response.json())
      .then((post) => {
        post && setPosting(post);
      });
  }

  function requestRideHandler(event) {
    const postIdx = event.target.value;
    posting.map((post, index) => {
      if (index == parseInt(postIdx)) {
        fetch("/api/request", {
          method: "post",
          body: JSON.stringify({ postId: post.id }),
        });
      }
    });
  }

  // Get all posting when first load
  useEffect(() => {
    fetch("/api/rideposting", { method: "get" })
      .then((response) => response.ok && response.json())
      .then((post) => {
        post && setPosting(post);
      });
  }, []);

  const listAllPost = posting.map((post, index) => (
    <div>
      <img src={pfpList[0]} width="100" height="100"></img>
      <h3 key={index}>Driver Name: {post.driverName}</h3>
      <h5 key={index}>Pick Up Location: {post.startLoc}</h5>
      <h5 key={index}>Destination: {post.endLoc}</h5>
      <h5 key={index}>Date: {post.date}</h5>
      <h5 key={index}>Time: {post.time}</h5>
      <h5 key={index}>Seats: {post.seats}</h5>
      <h5 key={index}>Price: {post.price}</h5>
      <button value={index} onClick={requestRideHandler}>
        Request Ride
      </button>
      <p> </p>
    </div>
  ));

  return (
    <div>
      <a href="/rider_home">
        <SlArrowLeftCircle size={32} />
      </a>
      <br />
      <strong>Back to Rider Home!</strong>
      <h1>Search Drivers</h1>

      <h4>Pick Up Location</h4>
      <input
        type="text"
        value={location}
        onChange={locationChanged}
        size="50"
      ></input>

      <h4>Destination</h4>
      <input
        type="text"
        value={destination}
        onChange={destinationChanged}
        size="50"
      ></input>

      <h4>Arrival Date & Time:</h4>
      <input type="text" value={date} onChange={dateChanged} size="20"></input>
      <img
        src="https://static.vecteezy.com/system/resources/previews/005/988/959/original/calendar-icon-free-vector.jpg"
        width="30"
        height="30"
      />
      <input type="text" value={time} onChange={timeChanged} size="20"></input>
      <img
        src="https://www.shutterstock.com/image-vector/clock-icon-trendy-flat-style-600nw-674379841.jpg"
        width="30"
        height="30"
      />

      <p></p>
      <a>Recurring?</a>
      <input type="checkbox" value={recur} onChange={recurChanged}></input>

      <p></p>

      <button onClick={searchHandler}>Search</button>

      <p></p>

      <h2>Drivers</h2>
      <p>{listAllPost}</p>
    </div>
  );
}

export default Home;
