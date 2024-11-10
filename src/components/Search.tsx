import { useState } from "react";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { Button, Flex, Input, useToast } from "@chakra-ui/react";
import { useQuery } from "react-query";

export const Search = () => {
  const [query, setQuery] = useState("");
  const toast = useToast();
  const map = useMap();

  const handleSearch = async () => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;
    try {
      const response = await axios.get(url);
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        map.setView([parseFloat(lat), parseFloat(lon)], 13);
        setQuery("");
      } else {
        toast({
          description: "장소를 찾을 수 없습니다",
          status: "error",
          duration: 1000,
          isClosable: false,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const {
    error,
    isLoading: searchLoading,
    isError,
    refetch,
  } = useQuery(["search", query], () => handleSearch, {
    enabled: false,
  });
  const searchQuery = () => {
    refetch();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      refetch();
    }
  };

  return (
    <>
      <Flex
        style={{
          position: "absolute",
          top: 10,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
        }}
      >
        <Input
          type="text"
          boxShadow="lg"
          background="#fff"
          value={query}
          onKeyDown={handleKeyDown}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="장소 검색"
        />
        <Button
          boxShadow="lg"
          ml={1}
          isLoading={searchLoading}
          onClick={searchQuery}
        >
          검색
        </Button>
      </Flex>
    </>
  );
};
