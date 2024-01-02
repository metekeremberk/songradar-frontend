import { useState, useEffect } from "react";
import Loading from "../loading/Loading";
import SongCard from "../music/SongCard";
import { getColorPairing } from "@/lib/colorPair";

export default function Songs({ skip = 0 }) {
  const [isLoading, setIsLoading] = useState(false);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/songs?skip=${skip}&limit=8`, {
      cache: "no-store",
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSongs(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {songs.map((song, i) => {
          return (
            <SongCard key={i} music={song} gradient={getColorPairing(song)} />
          );
        })}
      </div>
    );
  }
}
