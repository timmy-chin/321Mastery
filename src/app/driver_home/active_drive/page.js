"use client";

import { useState, useEffect } from "react";
import React from "react";
import { SlArrowLeftCircle } from "react-icons/sl";

export default function Page() {
  const [posting, setPosting] = useState([]);
  const [request, setRequest] = useState([]);
  const [riderIds, setRiderIds] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [declined, setDeclined] = useState([]);
  const [started, setStarted] = useState([]);
  const [ended, setEnded] = useState([]);


  // Load all my ride postings and the name of the riders of requested for them
  useEffect(() => {
    // Get all my posted rides
    const url = "/api/rideposting?userId=all";
    fetch(url)
      .then((response) => response.ok && response.json())
      .then((posts) => {
        const requestsPromises = posts.map((post) => {
          // Get all requests for my posted ride
          return fetch("/api/request?postId=" + post.id)
            .then((response) => response.ok && response.json())
            .then((requests) => {
              const profilePromises = requests.map((request) => {
                // Get username for the riderId in the request
                return fetch("/api/getProfile?userid=" + request.riderId)
                  .then((response) => response.ok && response.json())
                  .then((profiles) => {
                    // Assuming profiles array contains only one profile
                    const profile = profiles[0];
                    return profile.firstName + " " + profile.lastName;
                  });
              });
              // Wait for all profilePromises to resolve
              return Promise.all(profilePromises);
            });
        });
        // Wait for all requestsPromises to resolve
        setPosting(posts);
        return Promise.all(requestsPromises);
      })
      .then((updatedResult) => {
        setRequest(updatedResult);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Load all riderId into a database to match the rider names for accepting and declining
  useEffect(() => {
    // Get all posted rides
    const url = "/api/rideposting?userId=all";
    fetch(url)
      .then((response) => response.ok && response.json())
      .then((posts) => {
        const requestsPromises = posts.map((post) => {
          // Get all requests for the posted ride
          return fetch("/api/request?postId=" + post.id)
            .then((response) => response.ok && response.json())
            .then((requests) => {
              const riderIdPromises = requests.map((request) => {
                // Get riderId from the request
                return request.riderId;
              });
              // Wait for all promises to resolve
              return Promise.all(riderIdPromises);
            });
        });
        // Wait for all requestsPromises to resolve
        return Promise.all(requestsPromises);
      })
      .then((updatedResult) => {
        setRiderIds(updatedResult);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Load all accepted riders
  useEffect(() => {
    // Get all posted rides
    const url = "/api/rideposting?userId=all";
    fetch(url)
      .then((response) => response.ok && response.json())
      .then((posts) => {
        const acceptedPromises = posts.map((post) => {
          // Get all accepts for the posted ride
          return fetch("/api/accepted?postId=" + post.id)
            .then((response) => response.ok && response.json())
            .then((accepts) => {
              const riderIdPromises = accepts.map((accept) => {
                // Get riderId from the accepts
                return accept.riderId;
              });
              // Wait for all promises to resolve
              return Promise.all(riderIdPromises);
            });
        });

        // Wait for all promises to resolve
        return Promise.all(acceptedPromises);
      })
      .then((updatedResult) => {
        setAccepted(updatedResult);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Load all declined riders
  useEffect(() => {
    // Get all posted rides
    const url = "/api/rideposting?userId=all";
    fetch(url)
      .then((response) => response.ok && response.json())
      .then((posts) => {
        const declinedPromises = posts.map((post) => {
          // Get all declines for the posted ride
          return fetch("/api/declined?postId=" + post.id)
            .then((response) => response.ok && response.json())
            .then((declines) => {
              const riderIdPromises = declines.map((decline) => {
                // Get riderId from the declines
                return decline.riderId;
              });
              // Wait for all promises to resolve
              return Promise.all(riderIdPromises);
            });
        });

        // Wait for all promises to resolve
        return Promise.all(declinedPromises);
      })
      .then((updatedResult) => {
        setDeclined(updatedResult);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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


  function getDriveStatus() {
    for (let post of posting) {
        if (started.includes(post.id) && !ended.includes(post.id)) {
            return post.id;
        } else {
            return -1;
        }
    }
}

function displayActiveDrive(postId) {
    var index = 0
    for (let post of posting) {
        if (post.id == postId){
            return     <div>
            <h2 key={index}>{index + 1}.</h2>
            <h5 key={index}>Pick Up Location: {post.startLoc}</h5>
            <h5 key={index}>Destination: {post.endLoc}</h5>
            <h5 key={index}>Date: {post.date}</h5>
            <h5 key={index}>Time: {post.time}</h5>
            <h5 key={index}>Seats: {post.seats}</h5>
            <h5 key={index}>Price: {post.price}</h5>
            <h5>Your Riders:</h5>
            {
              <div key={index}>
                {" "}
                {request[index] == null || riderIds[index] == null ? (
                  "Loading Riders"
                ) : request[index].length == 0 && accepted[index] != null? (
                  <p>No Riders</p>
                ) : (
                  request[index].map((item, innerIndex) => (
                    <div>
                      <a key={innerIndex}>{accepted[index].includes(riderIds[index][innerIndex])  ? item : ""} </a>
                    </div>
                  ))
                )}
              </div>
            }
            <p>_______________________________________</p>
          </div>
        }
        index = index + 1
    }
}


  return (
    <div>
      <a href="/driver_home">
        <SlArrowLeftCircle size={32} />
      </a>
      <br />
      <strong>Back to Driver Home!</strong>
      <h2>My Active Ride</h2>
      {
        posting.length != 0 ? 
            getDriveStatus() != -1 ? displayActiveDrive(getDriveStatus()) : "No Active Drive" 
            : 
            "Loading"
      }
    </div>
  );
}
