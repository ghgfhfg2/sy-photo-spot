import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { Box, Button } from "@chakra-ui/react";
import LocationMarker from "./LocationMarker";
import styled from "styled-components";
import NewMarker from "./NewMarker";
const MapStyled = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  .btn-container {
    position: absolute;
    z-index: 2000;
    left: 50px;
    bottom: 50px;
  }
  .save-pointer-box {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    width: 100%;
    height: 100%;
    color: #fff;
    .info-txt {
      background: rgba(0, 0, 0, 0.5);
      padding: 10px;
      border-radius: 7px;
    }
  }
`;

function Map() {
  const mapRef = useRef();

  const handleCurrentLocation = () => {
    const map = mapRef.current;
    if (map != null) {
      map.locate().on("locationfound", function (e) {
        map.flyTo(e.latlng, 16);
      });
    }
  };

  const [saveMode, setSaveMode] = useState(false);
  const onSaveMode = () => {
    setSaveMode(!saveMode);
    console.log(saveMode);
  }; //위치 저장모드로 변경

  return (
    <>
      <MapStyled>
        <MapContainer
          ref={mapRef}
          center={[50.5, 30.5]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <div className="btn-container">
            <Button
              className="btn-move-currnet"
              onClick={handleCurrentLocation}
            >
              현재위치
            </Button>
            <Button className="btn-move-currnet" onClick={onSaveMode}>
              위치저장
            </Button>
          </div>
          {saveMode && (
            <>
              <div className="save-pointer-box">
                <div className="pointer"></div>
                <p className="info-txt">저장할 위치를 선택헤 주세요</p>
              </div>
              <NewMarker />
            </>
          )}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
          {/* Additional map layers or components can be added here */}
        </MapContainer>
      </MapStyled>
    </>
  );
}

export default Map;
