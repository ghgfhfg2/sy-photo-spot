import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { useMap } from "react-leaflet/hooks";

const LocationMarker = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const map = useMap();

  const handleLocationFound = (e) => {
    setCurrentPosition(e.latlng);
    map.setView(e.latlng, 16); // 고정 줌 레벨 설정
  };

  useEffect(() => {
    map.locate().on("locationfound", handleLocationFound);
  }, [map]);

  return currentPosition === null ? null : null;
  // <Marker position={currentPosition}>
  //   <Popup>현재 예상 위치</Popup>
  // </Marker>
};
export default LocationMarker;
