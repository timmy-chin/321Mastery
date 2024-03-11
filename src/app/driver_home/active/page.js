"use client"

import { useState, useEffect } from 'react';
import React from 'react';

export default function Page() {
  const [posting, setPosting] = useState([]);
  const [request, setRequest] = useState([]);
  const [riderIds, setRiderIds] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [declined, setDeclined] = useState([]);

  function acceptedHandler(event) {
    const payload = event.target.value;
    const payloadValue = payload.split(":")
    const postId = parseInt(payloadValue[0]);
    const riderId = parseInt(payloadValue[1]);
    fetch("/api/accepted", { method: "post", body: JSON.stringify({postId: postId, riderId: riderId})});
  }

  function declinedHandler(event) {
    const payload = event.target.value;
    const payloadValue = payload.split(":")
    const postId = parseInt(payloadValue[0]);
    const riderId = parseInt(payloadValue[1]);
    fetch("/api/declined", { method: "post", body: JSON.stringify({postId: postId, riderId: riderId})});
  }

  // Load all my ride postings and the name of the riders of requested for them
  useEffect(() => {
    // Get all my posted rides
    const url = "/api/rideposting?userId=all";
    fetch(url)
      .then(response => response.ok && response.json())
      .then(posts => {  
        const requestsPromises = posts.map(post => {
          // Get all requests for my posted ride
          return fetch("/api/request?postId=" + post.id)
            .then(response => response.ok && response.json())
            .then(requests => {
              const profilePromises = requests.map(request => {
                // Get username for the riderId in the request
                return fetch("/api/getProfile?userid=" + request.riderId)
                  .then(response => response.ok && response.json())
                  .then(profiles => {
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
      .then(updatedResult => {
        setRequest(updatedResult);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

    // Load all riderId into a database to match the rider names for accepting and declining
    useEffect(() => {
      // Get all posted rides
      const url = "/api/rideposting?userId=all";
      fetch(url)
        .then(response => response.ok && response.json())
        .then(posts => {  
          const requestsPromises = posts.map(post => {
            // Get all requests for the posted ride
            return fetch("/api/request?postId=" + post.id)
              .then(response => response.ok && response.json())
              .then(requests => {
                const riderIdPromises = requests.map(request => {
                  // Get riderId from the request
                  return request.riderId
                });
                // Wait for all promises to resolve
                return Promise.all(riderIdPromises);
              });
          });
    
          // Wait for all requestsPromises to resolve
          return Promise.all(requestsPromises);
        })
        .then(updatedResult => {
          setRiderIds(updatedResult);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }, []);

    // Load all accepted riders
    useEffect(() => {
      // Get all posted rides
      const url = "/api/rideposting?userId=all";
      fetch(url)
        .then(response => response.ok && response.json())
        .then(posts => {  
          const acceptedPromises = posts.map(post => {
            // Get all accepts for the posted ride
            return fetch("/api/accepted?postId=" + post.id)
              .then(response => response.ok && response.json())
              .then(accepts => {
                const riderIdPromises = accepts.map(accept => {
                  // Get riderId from the accepts
                  return accept.riderId
                });
                // Wait for all promises to resolve
                return Promise.all(riderIdPromises);
              });
          });
    
          // Wait for all promises to resolve
          return Promise.all(acceptedPromises);
        })
        .then(updatedResult => {
          setAccepted(updatedResult);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }, []);

    // Load all declined riders
    useEffect(() => {
      // Get all posted rides
      const url = "/api/rideposting?userId=all";
      fetch(url)
        .then(response => response.ok && response.json())
        .then(posts => {  
          const declinedPromises = posts.map(post => {
            // Get all declines for the posted ride
            return fetch("/api/declined?postId=" + post.id)
              .then(response => response.ok && response.json())
              .then(declines => {
                const riderIdPromises = declines.map(decline => {
                  // Get riderId from the declines
                  return decline.riderId
                });
                // Wait for all promises to resolve
                return Promise.all(riderIdPromises);
              });
          });
    
          // Wait for all promises to resolve
          return Promise.all(declinedPromises);
        })
        .then(updatedResult => {
          setDeclined(updatedResult);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }, []);


  // Get status of rider request from database based on riderId and post index  
  function getStatus(index, riderId) {
      if (accepted[index] != null && accepted[index].includes(riderId)) {
          return <a> Accepted</a>
      }
      else if (declined[index] != null && declined[index].includes(riderId)) {
          return <a> Declined</a>
      }
      else {
          return " "
      }
  }

  const listAllRides = posting.map((post, index) => (
    <div>
          <h3 key={index}>{index + 1}.</h3>
          <h5 key={index}>Pick Up Location: {post.startLoc}</h5>
          <h5 key={index}>Destination: {post.endLoc}</h5>
          <h5 key={index}>Date: {post.date}</h5>
          <h5 key={index}>Time: {post.time}</h5>
          <h5 key={index}>Seats: {post.seats}</h5>
          <h5 key={index}>Price: {post.price}</h5>
          <h5>Requests:</h5>
          {
            <div key={index}> {
              request[index] == null || riderIds[index] == null ?
                "Loading Requests" 
                :
                request[index].length == 0 ?
                  <p>No Request</p>
                  :
                  request[index].map(
                    (item, innerIndex) => (
                      <div>
                      <a key={innerIndex}>{item}  </a>
                      <button value={post.id.toString() + ":" + riderIds[index][innerIndex].toString()} onClick={acceptedHandler}>Accept</button>
                      <button value={post.id.toString() + ":" + riderIds[index][innerIndex].toString()} onClick={declinedHandler}>Decline</button>
                      <a>{getStatus(index, riderIds[index][innerIndex])}</a>
                      </div>
                    )
                  )
            }
            </div>
          }
          <p>_______________________________________</p>
    </div>
  ));

  return <div>
    <h2>My Rides</h2>
    {listAllRides}
    </div>;
}