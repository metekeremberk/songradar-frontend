import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import ItemMenu from "./ItemMenu";

export default async function SongsByArtist({ searchWord }) {
  const [isLoading, setIsLoading] = useState(false);
  const [songsByArtist, setSongsByArtist] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/songs/search_artist?artist=${searchWord}&skip=0&limit=5`,
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
        setSongsByArtist(data);
        setIsLoading(false);
      });
  }, [searchWord]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="w-full p-4">
        {songsByArtist.map((song, i) => {
          const name = song.name;
          let artists = "Artists";
          try {
            artists = JSON.parse(song.artists.replace(/'/g, '"'));
          } catch (error) {
            console.log(error);
          }
          const year = song.year;
          return (
            <div
              key={i}
              className="relative grid grid-cols-6 items-center gap-3 rounded px-4 py-2 transition-colors hover:bg-zinc-800"
            >
              <div className="col-span-3 truncate">{name}</div>
              <div className="col-span-2 truncate text-sm font-light opacity-60">
                {artists.toString()}
              </div>
              <div className="truncate text-sm font-light opacity-60">
                {year}
              </div>
              <div className="absolute right-8 top-2">
                <ItemMenu track={song} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
