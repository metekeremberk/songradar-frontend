import { useState, useEffect } from "react";
import Loading from "../loading/Loading";
import PlaylistsCard from "../music/PlaylistCard";

export default function Playlists({ skip = 0 }) {
  const [isLoading, setIsLoading] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/songs?skip=${skip}&limit=32`,
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
        setPlaylists(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    const chunkSize = 4;
    const chunkedPlaylists = [];
    for (let i = 0; i < playlists.length; i += chunkSize) {
      chunkedPlaylists.push(playlists.slice(i, i + chunkSize));
    }
    return (
      <div className="flex justify-between gap-3">
        {chunkedPlaylists.map((chunk, i) => {
          return <PlaylistsCard key={i} music={chunk} />;
        })}
      </div>
    );
  }
}
