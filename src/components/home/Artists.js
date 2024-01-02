import { useState, useEffect } from "react";
import Loading from "../loading/Loading";
import ArtistCard from "../music/ArtistCard";
import { getColorPairing } from "@/lib/colorPair";

export default function Artists({ skip = 0 }) {
  const [isLoading, setIsLoading] = useState(false);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/albums?skip=${skip}&limit=8`,
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
        setArtists(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="flex justify-between gap-3">
        {artists.map((artist, i) => {
          return (
            <ArtistCard
              key={i}
              music={artist}
              gradient={getColorPairing(artist)}
            />
          );
        })}
      </div>
    );
  }
}
