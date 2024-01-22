import { useEffect, useState } from "react";
import Loading from "../../loading/Loading";
import SongItem from "./SongItem";

export default function SongsByName({ searchWord, playlists, toggled }) {
  const [isLoading, setIsLoading] = useState(false);
  const [songsByName, setSongsByName] = useState([]);

  function getSongs(skip, limit) {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/songs/search_name?name=${searchWord}&skip=${skip}&limit=${limit}`,
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
        setSongsByName((prevList) => [...prevList, ...data]);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    setSongsByName([]);
    if (toggled) {
      getSongs(0, 20);
    } else {
      getSongs(0, 5);
    }
    setIsLoading(false);
  }, [searchWord, toggled]);

  function loadMoreSongs() {
    getSongs(songsByName.length, 20);
  }

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className={"w-full p-4 " + `${toggled && "px-14"}`}>
        {songsByName?.map((song, i) => {
          return <SongItem song={song} playlists={playlists} key={i} />;
        })}
        {toggled && (
          <div className="flex w-full items-center justify-center">
            <button
              className="rounded border border-zinc-700 bg-zinc-800 px-4 py-2 transition-colors hover:bg-zinc-700"
              onClick={loadMoreSongs}
            >
              Load more songs
            </button>
          </div>
        )}
      </div>
    );
  }
}
