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
        } 
    }
    return -1;
}

function displayActiveDrive(postId) {
  console.log("this is the PostId: " + postId)
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
            <h2 key={index}>{index + 1}.</h2>
            <h5 key={index}>Pick Up Location: {post.startLoc}</h5>
            <h5 key={index}>Destination: {post.endLoc}</h5>
            <h5 key={index}>Date: {post.date}</h5>
            <h5 key={index}>Time: {post.time}</h5>
            <h5 key={index}>Price: {post.price}</h5>
            <h5>Riders:</h5>
            {
              <div key={index}>
                {" "}
                {request[index] == null || riderIds[index] == null || accepted[index] == null ? (
                  "Loading Riders"
                ) : request[index].length == 0 && accepted[index] != null? (
                  <p>No Riders</p>
                ) : (
                  request[index].map((item, innerIndex) => (
                    <div>
                      <a key={innerIndex}>{accepted[index].includes(riderIds[index][innerIndex])  ? 
                        <div>
                            <a href={"/rider_home/profile/"+riderIds[index][innerIndex]}><img src={"https://t4.ftcdn.net/jpg/00/64/67/27/240_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"} width="30" height="30"></img></a>
                            <a>{item}</a>
                        </div> 
                        
                        : ""} 
                      </a>
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
      <h2>My Active Drive</h2>
      {
        posting.length != 0 && ended.length != 0 && started.length != 0? 
            getDriveStatus() != -1 ? displayActiveDrive(getDriveStatus()) : "No Active Drive"
            : 
            "Loading"
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
  const [started, setStarted] = useState([]);
  const [ended, setEnded] = useState([]);
  const [startLoc, setStartLoc] = useState("Hi");
  const [endLoc, setEndLoc] = useState("Hi");
  const [loaded, setLoaded] = useState(false)

    // Load all my ride postings
    useEffect(() => {
      // Get all my posted rides
      const url = "/api/rideposting?userId=all";
      fetch(url)
        .then((response) => response.ok && response.json())
        .then((posts) => {
          setPosting(posts);
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

if (started.length != 0 && ended.length != 0){
  setStartandEndLoation(getDriveStatus())
}
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
