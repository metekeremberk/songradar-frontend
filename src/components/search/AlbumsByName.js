import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import Link from "next/link";
import ItemMenu from "./ItemMenu";

export default function AlbumsByName({ searchWord }) {
  const [isLoading, setIsLoading] = useState(false);
  const [albumsByName, setAlbumsByName] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/albums/search_name?name=${searchWord}&skip=0&limit=5`,
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
        setAlbumsByName(data);
        setIsLoading(false);
      });
  }, [searchWord]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="w-full p-4">
        {albumsByName.map((album, i) => {
          const name = album.name;
          let artists = "Artists";
          try {
            artists = JSON.parse(album.artists.replace(/'/g, '"'));
          } catch (error) {
            console.log(error);
          }
          const year = album.year;
          return (
            <Link
              href={`/albums/${album.id}`}
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
                <ItemMenu track={album} />
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}
