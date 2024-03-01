import {
  APIProvider,
  MapControl,
  ControlPosition,
  Map,
  Marker,
  useMap,
} from "@vis.gl/react-google-maps";
import React, { useEffect } from "react";

const MyComponent = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // here you can interact with the imperative maps API
  }, [map]);

  return <></>;
};

function MyMap() {
  const position = { lat: 35.270378, lng: -120.680656 };

  return (
    <APIProvider apiKey={"AIzaSyBbIHcBGTaWVhqIRWz8MEJbMxcfa9Khig0"}>
      <Map center={position} zoom={10}>
        <Marker position={position} />
        <MyComponent />
      </Map>
    </APIProvider>
  );
}

export default MyMap;
