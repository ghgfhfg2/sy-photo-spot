import React, { memo, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L, { Map as LeafletMap, LatLng, LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import LocationMarker from "../LocationMarker";
import NewMarker from "../newMarker";
import BottomMenu from "../BottomMenu";
import { MapStyled } from "../../style/componentStyle";
import { api } from "../../api";
import MarkerCluster from "../markerCluster";
import MarkerPopup from "../modal/MarkerPopup";
import { useDisclosure } from "@chakra-ui/react";
import { useStore } from "../../store/store";
import { addMonths, format } from "date-fns";
import { Search } from "../Search";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// L.Icon.Default의 아이콘 경로 설정
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Map: React.FC = () => {
  const mapRef = useRef<LeafletMap | null>(null);
  const [saveMode, setSaveMode] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const marker = useStore((state) => state.marker);
  const date = useStore((state) => state.date);

  const handleCurrentLocation = () => {
    const map = mapRef.current;
    setSaveMode(false);
    if (map) {
      map.locate().on("locationfound", function (e: { latlng: LatLng }) {
        map.flyTo(e.latlng, 16);
      });
    }
  };

  const onSaveMode = () => {
    setSaveMode(!saveMode);
  };

  const fetchBoundsLocation = async (
    bounds: LatLngBounds,
    startDate: string
  ) => {
    const endDate = startDate
      ? format(addMonths(new Date(startDate), 1), "yyyy-MM")
      : "";
    const locationData = {
      northEast_lat: bounds.getNorthEast().lat,
      northEast_lng: bounds.getNorthEast().lng,
      southWest_lat: bounds.getSouthWest().lat,
      southWest_lng: bounds.getSouthWest().lng,
    };

    const { data } = await api.post(`/photo.php`, {
      a: "getLocationList",
      ...locationData,
      startDate: startDate ? `${startDate}-01 00:00:00` : "",
      endDate: endDate ? `${endDate}-01 00:00:00` : "",
    });
    return data;
  };

  const [locationList, setLocationList] = useState<any[]>([]); // 타입을 Array로 변경
  const [render, setRender] = useState<number>(0);

  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      const handleMoveEnd = () => {
        const bounds = map.getBounds();
        if (map.getZoom() >= 12) {
          fetchBoundsLocation(bounds, date).then((res) => {
            setLocationList(res.list);
          });
        } else {
          setLocationList([]);
        }
      };
      map.on("moveend", handleMoveEnd);
      return () => {
        map.off("moveend", handleMoveEnd);
      };
    } else {
      //setRender((prev) => prev + 1);
    }
  }, [mapRef, render, date]);

  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      const bounds = map.getBounds();
      if (map.getZoom() >= 12) {
        fetchBoundsLocation(bounds, date).then((res) => {
          setLocationList(res.list);
        });
      } else {
        setLocationList([]);
      }
    }
  }, [render]);

  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      map.locate().on("locationfound", function (e: { latlng: LatLng }) {
        map.flyTo(e.latlng, 16);
      });
    }
  }, [mapRef]);

  return (
    <MapStyled>
      <MapContainer
        center={[37.566, 126.98]}
        zoom={13}
        maxZoom={18}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(mapInstance: L.Map | null) =>
          (mapRef.current = mapInstance)
        }
      >
        <BottomMenu
          handleCurrentLocation={handleCurrentLocation}
          setSaveMode={setSaveMode}
          onSaveMode={onSaveMode}
          saveMode={saveMode}
          setRender={setRender}
        />
        {saveMode && (
          <>
            <div className="save-pointer-box">
              <div className="pointer"></div>
              <p className="info-txt">저장할 위치를 선택해 주세요</p>
            </div>
            <NewMarker setRender={setRender} setSaveMode={setSaveMode} />
          </>
        )}
        {locationList && (
          <>
            <MarkerCluster onOpen={onOpen} markers={locationList} />
          </>
        )}

        {marker && (
          <MarkerPopup
            setRender={setRender}
            data={marker}
            isOpen={isOpen}
            onClose={onClose}
          />
        )}

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          detectRetina={true}
        />
        <Search />
        <LocationMarker />
      </MapContainer>
    </MapStyled>
  );
};

export default Map;
