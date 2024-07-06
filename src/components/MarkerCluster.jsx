import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/leaflet.markercluster-src";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { api } from "../api";
import { useStore } from "../store/store";

const MarkerCluster = ({ markers, onOpen }) => {
  const map = useMap();

  const setMarker = useStore((state) => state.setMarker);
  const markerList = useStore((state) => state.markerList);
  const putMarkerList = useStore((state) => state.putMarkerList);

  const getMarkerData = async (id) => {
    const { data } = await api.post(`/photo.php`, {
      a: "getMarkerDetails",
      id,
    });
    return data;
  };

  useEffect(() => {
    const markerClusterGroup = L.markerClusterGroup();

    markers.forEach((markerEl) => {
      const leafletMarker = L.marker([markerEl.lat, markerEl.lng]);
      leafletMarker.on("click", async () => {
        try {
          const find = markerList.find((el) => el.uid === markerEl.id); //state에 있는지 확인
          if (find) {
            setMarker(find);
            onOpen();
            return;
          } else {
            const data = await getMarkerData(markerEl.id);
            setMarker(data.markerData);
            putMarkerList(data.markerData);
            onOpen();
          }
        } catch (error) {
          leafletMarker.setPopupContent("Failed to load data");
        }
      });
      leafletMarker.addTo(markerClusterGroup);
    });

    map.addLayer(markerClusterGroup);

    return () => {
      map.removeLayer(markerClusterGroup);
    };
  }, [map, markers, markerList]);

  return null;
};

export default MarkerCluster;
