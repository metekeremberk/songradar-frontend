import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";

export default async function AlbumsByArtist({ searchWord }) {
  const [isLoading, setIsLoading] = useState(false);
  const [albumsByArtist, setAlbumsByArtist] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/albums/search_artist?artist=${searchWord}&skip=0&limit=5`,
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
        setAlbumsByArtist(data);
        setIsLoading(false);
      });
  }, [searchWord]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="m-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <p className="pb-1 text-lg">Albums by artist</p>
        {albumsByArtist.map((album, i) => {
          const name = album.name;
          let artists = "Artists";
          try {
            artists = JSON.parse(music.artists.replace(/'/g, '"'));
          } catch (error) {
            console.log(error);
          }
          const year = album.year;
          return (
            <Link
              href={`/albums/${album.id}`}
              key={i}
              className="grid grid-cols-7 items-center gap-3 border-t border-zinc-800 px-4 py-2 transition-colors hover:bg-zinc-800"
            >
              <div className="col-span-3 truncate">{name}</div>
              <div className="col-span-2 truncate text-sm font-light opacity-60">
                {artists.toString()}
              </div>
              <div className="truncate text-sm font-light opacity-60">
                {year}
              </div>
              <div></div>
            </Link>
          );
        })}
      </div>
    );
  }
}
