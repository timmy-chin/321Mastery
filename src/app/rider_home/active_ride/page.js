"use client";

import { useState, useEffect } from "react";
import React from "react";
import { SlArrowLeftCircle } from "react-icons/sl";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";

export default function Page() {
  const [posting, setPosting] = useState([]);
  const [myRides, setMyRides] = useState([]);
  const [request, setRequest] = useState([]);
  const [riderIds, setRiderIds] = useState([]);
  const [acceptedRider, setAcceptedRider] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [declined, setDeclined] = useState([]);
  const [started, setStarted] = useState([]);
  const [ended, setEnded] = useState([]);
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  function submitRatingHandler(event) {
    const driverId = parseInt(event.target.value);
    setSubmitted(true)
    fetch("/api/rating", {
      method: "post",
      body: JSON.stringify({ driverId: driverId, rating: rating }),
    });
  }

    // Load all my ride postings and the name of the riders of requested for them
    useEffect(() => {
      // Get all my posted rides
      const url = "/api/rideposting";
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
      const url = "/api/rideposting";
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
      const url = "/api/rideposting";
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
          setAcceptedRider(updatedResult);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);

  const handleRate = (value) => {
    setRating(value);
  };

  const pfpList = [
    "https://t4.ftcdn.net/jpg/00/64/67/27/240_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg",
  ];

    // Load all ride postings and the name of the riders of requested for them
    useEffect(() => {
      // Get all my posted rides
      const url = "/api/rideposting";
      fetch(url)
        .then((response) => response.ok && response.json())
        .then((posts) => {
          setPosting(posts);
        });
    }, []);


  // Get all my requeseted ride posting
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
      if (request != null && started.includes(request.id) && !ended.includes(request.id) && accepted.includes(request.id)) {
          return request.id;
      }
  }
  return -1;
}

function getMostRecentEndedRide() {
  const myRequests = myRides.map((ride, index) => {
    if (ride != null){
      return ride.id;
    }
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
    const position = {   lat: 35.280783, lng: -120.660708 };
    
    for (let post of posting) {
        if (post.id == postId){
          const mapURL = "https://www.google.com/maps/dir/"+ post.startLoc+",+San+Luis+Obispo/"+post.endLoc+",+San+Luis+Obispo"
            return     <div>
            <div style={{ height: "70vh", width: "75%" }}>
              <APIProvider apiKey="AIzaSyBN5ekdAsvbC9BQHt6ypTeQqiC-X36XUVU">
                <Map
                  center={position}
                  zoom={12.9}
                  mapId="4435667cbc8b5783"
                  fullscreenControl={false}
                >
                  <Directions/>
                </Map>
              </APIProvider>
            </div>   
            <p></p>
            <a href={mapURL}>
              <button>Open in Google Maps</button>
            </a>
            <p></p>
            <a href={"/driver_home/profile/"+post.driverId}><img src={pfpList[0]} width="100" height="100"></img></a>
            <h3 key={index}>Driver: {post.driverName}</h3>
            <h5 key={index}>Pick Up Location: {post.startLoc}</h5>
            <h5 key={index}>Destination: {post.endLoc}</h5>
            <h5 key={index}>Date: {post.date}</h5>
            <h5 key={index}>Time: {post.time}</h5>
            <h5>Riders: </h5>
            {
              <div key={index}>
                {" "}
                {request[index] == null || riderIds[index] == null || acceptedRider[index] == null ? (
                  "Loading Riders"
                ) : request[index].length == 0 && acceptedRider[index] != null? (
                  <p>No Other Riders</p>
                ) : (
                  request[index].map((item, innerIndex) => (
                    <div>
                      <a key={innerIndex}>{acceptedRider[index].includes(riderIds[index][innerIndex])  ? 
                        <div>
                            <a href={"/rider_home/profile/"+riderIds[index][innerIndex]}><img src={"https://t4.ftcdn.net/jpg/00/64/67/27/240_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"} width="30" height="30"></img></a>
                            <a> {item}</a>
                        </div> 
                        
                        : ""} 
                      </a>                    
                    </div>
                  ))
                )}
              </div>
            }
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
          {submitted == false ?
          <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "15vh",
          }}>
              <h4>How was your ride with {post.driverName}?</h4>
              <div style={{ marginBottom: "20px" }}>
              {[...Array(5)].map((_, index) => (
                <button key={index} onClick={() => handleRate(index + 1)}>
                  {index < rating ? "★" : "☆"}
                </button>
              ))}
            </div>
              <button value={post.driverId} onClick={submitRatingHandler}>Submit Rating</button>
          </div>
            :
            <h4>Thanks for submitting your feedback!</h4>
          }
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
        posting.length != 0 && myRides.length != 0? 
            getStartedRide() != -1 ? 
              displayActiveRide(getStartedRide()) 
              : 
              getMostRecentEndedRide() != -1 ?
                displayRateMyRidePage(getMostRecentEndedRide())
                :
                "No Active Ride"
            : 
            "Waiting for Ride to Start"
      } 
    </div>
  );
}

function Directions() {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState();
  const [directionsRenderer, setDirectionsRenderer] =
    useState();
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];
  const [posting, setPosting] = useState([]);
  const [myRides, setMyRides] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [declined, setDeclined] = useState([]);
  const [started, setStarted] = useState([]);
  const [ended, setEnded] = useState([]);
  const [rating, setRating] = useState(0);
  const [startLoc, setStartLoc] = useState("Hi");
  const [endLoc, setEndLoc] = useState("Hi");
  const [loaded, setLoaded] = useState(false)

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
      if (request != null && started.includes(request.id) && !ended.includes(request.id) && accepted.includes(request.id)) {
          return request.id;
      }
  }
  return -1;
}

function setStartandEndLoation(postId) {
  const url = "/api/rideposting?postId="+postId;
  fetch(url)
    .then((response) => response.ok && response.json())
    .then((posting) => {
      if (posting.length != 0){
        if (startLoc != posting[0].startLoc || endLoc != posting[0].endLoc){
          setLoaded(true)
        }  
        setStartLoc(posting[0].startLoc)
        setEndLoc(posting[0].endLoc)
      }
    });
    
  if (postId == -1 || posting.length == 0){
    return {
      startLoc: "Loading",
      endLoc: "Loading"
    }
  }
  for (let post of posting) {
    if (post.id == postId){
        return post
    }
  }
}

useEffect(() => {
  if (!routesLibrary || !map) return;
  setDirectionsService(new routesLibrary.DirectionsService());
  setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
}, [routesLibrary, map]);

useEffect(() => {
  console.log("start direction: " + startLoc)
  console.log("end direction: " + endLoc)
  if (!directionsService || !directionsRenderer) return;
  directionsService
    .route({
      origin: startLoc + ", San Luis Obispo",
      destination: endLoc + ", San Luis Obispo",
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
      setRoutes(response.routes);
    });

  return () => directionsRenderer.setMap(null);
}, [directionsService, directionsRenderer]);

useEffect(() => {
  if (!directionsRenderer) return;
  directionsRenderer.setRouteIndex(routeIndex);
}, [routeIndex, directionsRenderer]);

setStartandEndLoation(getStartedRide())

if (loaded == true && directionsService != null) {
  setLoaded(false);
directionsService
.route({
  origin: startLoc + ", San Luis Obispo",
  destination: endLoc + ", San Luis Obispo",
  travelMode: google.maps.TravelMode.DRIVING,
  provideRouteAlternatives: true,
})
.then((response) => {
  directionsRenderer.setDirections(response);
  setRoutes(response.routes);
});
}

  if (!leg) return null;

  return (
    <div className="directions">
      <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>

      <h2>Other Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={route.summary}>
            <button onClick={() => setRouteIndex(index)}>
              {route.summary}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}