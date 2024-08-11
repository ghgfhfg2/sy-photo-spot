import React from "react";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

const LocationMarker = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const map = useMap();

  const handleLocationFound = (e: any) => {
    setCurrentPosition(e.latlng);
    map.setView(e.latlng, 16); // 고정 줌 레벨 설정
  };

  useEffect(() => {
    map.locate().on("locationfound", handleLocationFound);
  }, [map]);

  return currentPosition === null ? null : <></>;
};
export default LocationMarker;
