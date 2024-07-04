import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Marker } from "react-leaflet";
import { colors } from "../style/colors";
import { divIcon } from "leaflet";
import { FaLocationDot } from "react-icons/fa6";

function LoadMarker({ marker }) {
  const iconMarkup = renderToStaticMarkup(
    <>
      <FaLocationDot
        style={{
          width: "30px",
          height: "35px",
          position: "absolute",
          zIndex: "2000",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          color: colors.PURPLE_600,
        }}
      />
    </>
  );
  const customMarkerIcon = divIcon({
    html: iconMarkup,
  });

  return (
    <>
      <Marker
        key={marker.uid}
        icon={customMarkerIcon}
        position={[marker.lat, marker.lng]}
      />
    </>
  );
}

export default LoadMarker;
