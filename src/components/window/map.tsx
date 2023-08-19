import React from "react";
import Map from "../Layout/Map/map";

export const MapWindow = () => {
  const initialLatLng: [number, number] = [52.5187, -1.9945];

  return (
    <>
      <div className="container mx-auto py-5 bg-white px-5 mb-10">
        <div className="justify-center">
          <Map initialLatLng={initialLatLng} />
        </div>
      </div>
    </>
  );
};

export default MapWindow;
