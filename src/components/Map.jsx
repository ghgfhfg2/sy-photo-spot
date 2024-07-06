import { memo, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LocationMarker from "./LocationMarker";
import NewMarker from "./NewMarker";
import BottomMenu from "./BottomMenu";
import { MapStyled } from "../style/componentStyle";
import { api } from "../api";
import MarkerCluster from "./MarkerCluster";
import MarkerPopup from "./modal/MarkerPopup";
import { Box, useDisclosure } from "@chakra-ui/react";
import { useStore } from "../store/store";
import { addMonths, format } from "date-fns";
import { Search } from "./Search";

function Map({ userInfo }) {
  const mapRef = useRef();
  const [saveMode, setSaveMode] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const marker = useStore((state) => state.marker);
  const date = useStore((state) => state.date);
  const searchMaxDate = format(addMonths(new Date(date), 1), "yyyy-MM");

  const handleCurrentLocation = () => {
    const map = mapRef.current;
    setSaveMode(false);
    if (map != null) {
      map.locate().on("locationfound", function (e) {
        map.flyTo(e.latlng, 16);
      });
    }
  };

  const onSaveMode = () => {
    setSaveMode(!saveMode);
  }; //위치 저장모드로 변경

  const fetchBoundsLocation = async (bounds, startDate, endDate) => {
    const locationData = {
      northEast_lat: bounds._northEast.lat,
      northEast_lng: bounds._northEast.lng,
      southWest_lat: bounds._southWest.lat,
      southWest_lng: bounds._southWest.lat,
    };
    const { data } = await api.post(`/photo.php`, {
      a: "getLocationList",
      ...locationData,
      startDate: `${startDate}-01 00:00:00`,
      endDate: `${endDate}-01 00:00:00`,
    });
    return data;
  }; //범위 내 마커리스트 가져오기

  const [locationList, setLocationList] = useState();
  const [render, setRender] = useState(0);
  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      const handleMoveEnd = () => {
        const bounds = map.getBounds();
        if (map._zoom >= 12) {
          fetchBoundsLocation(bounds, date, searchMaxDate).then((res) => {
            setLocationList(res.list);
          });
        } else {
          setLocationList("");
        }
      };
      map.on("moveend", handleMoveEnd); //지도 이동 후 이벤트
      return () => {
        map.off("moveend", handleMoveEnd);
      };
    } else {
      setRender(render + 1);
    }
  }, [mapRef, render, date]);

  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      map.locate().on("locationfound", function (e) {
        map.flyTo(e.latlng, 16);
      });
    }
  }, []);

  // useEffect(() => {
  //   setLocationList(locationList);
  // }, [locationList]);

  return (
    <>
      <MapStyled>
        <MapContainer
          ref={mapRef}
          center={[37.566, 126.98]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          whenCreated
        >
          <BottomMenu
            handleCurrentLocation={handleCurrentLocation}
            setSaveMode={setSaveMode}
            onSaveMode={onSaveMode}
            saveMode={saveMode}
          />
          {saveMode && (
            <>
              <div className="save-pointer-box">
                <div className="pointer"></div>
                <p className="info-txt">저장할 위치를 선택헤 주세요</p>
              </div>
              <NewMarker setSaveMode={setSaveMode} />
            </>
          )}
          {locationList && (
            <>
              <MarkerCluster onOpen={onOpen} markers={locationList} />
            </>
          )}

          {marker && (
            <MarkerPopup data={marker} isOpen={isOpen} onClose={onClose} />
          )}

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Search />
          <LocationMarker />
          {/* Additional map layers or components can be added here */}
        </MapContainer>
      </MapStyled>
    </>
  );
}

export default Map;
