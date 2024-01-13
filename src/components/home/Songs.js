import { useState, useEffect } from "react";
import Loading from "../loading/Loading";
import SongCard from "../music/SongCard";

export default function Songs() {
  const [isLoading, setIsLoading] = useState(false);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/songs/recent?skip=0&limit=6`,
      {
        cache: "no-store",
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    )
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
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
        {songs.map((song, i) => {
          return <SongCard key={i} music={song} />;
        })}
      </div>
    );
  }
}
