import { useState, useEffect } from "react";
import Loading from "../../loading/Loading";
import AlbumCard from "../../music/AlbumCard";

export default function Albums() {
  const [isLoading, setIsLoading] = useState(false);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/albums/recent?skip=0&limit=8`,
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
        setAlbums(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="flex justify-between gap-3 overflow-auto">
        {albums.map((album, i) => {
          return <AlbumCard key={i} album={album} />;
        })}
      </div>
    );
  }
}
