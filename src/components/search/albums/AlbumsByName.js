import { useEffect, useState } from "react";
import Loading from "../../loading/Loading";
import Link from "next/link";
import AlbumItemMenu from "./AlbumItemMenu";
import AlbumItem from "./AlbumItem";

export default function AlbumsByName({ searchWord, toggled }) {
  const [isLoading, setIsLoading] = useState(false);
  const [albumsByName, setAlbumsByName] = useState([]);

  function getAlbums(skip, limit) {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/albums/search_name?name=${searchWord}&skip=${skip}&limit=${limit}`,
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
        setAlbumsByName((prevList) => [...prevList, ...data]);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    setAlbumsByName([]);
    if (toggled) {
      getAlbums(0, 20);
    } else {
      getAlbums(0, 5);
    }
    setIsLoading(false);
  }, [searchWord, toggled]);

  function loadMoreAlbums() {
    getAlbums(albumsByName.length, 20);
  }

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className={"w-full p-4 " + `${toggled && "px-14"}`}>
        {albumsByName.map((album, i) => {
          return <AlbumItem album={album} key={i} />;
        })}
        {toggled && (
          <div className="flex w-full items-center justify-center">
            <button
              className="rounded border border-zinc-700 bg-zinc-800 px-4 py-2 transition-colors hover:bg-zinc-700"
              onClick={loadMoreAlbums}
            >
              Load more albums
            </button>
          </div>
        )}
      </div>
    );
  }
}
