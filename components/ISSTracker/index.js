import useSWR from "swr";
import { useEffect, useState } from "react";
import Controls from "../Controls/index";
import Map from "../Map/index";

const URL = "https://api.wheretheiss.at/v1/satellites/25544";

export default function ISSTracker() {
  const [coords, setCoords] = useState({
    longitude: 0,
    latitude: 0,
  });

  const fetcher = async (url) => {
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error("")
    }
  }

  const {
    data: coords,
    isLoading,
    error,
  } = useSWR(`https://api.wheretheiss.at/v1/satellites/25544/${id}`, fetcher)};

  if (error) {
    return <h1>failed to load: {error.message}</h1>;
  }

  if(isLoading) {
    return <h1> ✌️ is loading</h1>; 
  }

  return (
    <></>
  )
  async function getISSCoords() {
    try {
      const response = await fetch(URL);
      if (response.ok) {
        const data = await response.json();
        setCoords({ longitude: data.longitude, latitude: data.latitude });
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      getISSCoords();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <main>
      <Map longitude={coords.longitude} latitude={coords.latitude} />
      <Controls
        longitude={coords.longitude}
        latitude={coords.latitude}
        onRefresh={getISSCoords}
      />
    </main>
  );
}
