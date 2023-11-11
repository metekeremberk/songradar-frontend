"use client";

import SongList from "@/components/songs/SongList";
import CreateSong from "@/components/songs/CreateSong";
import DeleteSong from "@/components/songs/DeleteSong";
import { useState } from "react";

export default function AlbumMenu() {
  const [page, setPage] = useState(1);

  return (
    <div className="flex h-2/3 w-2/3 flex-col justify-between gap-2 rounded border bg-gray-100 p-2">
      <div className="flex w-full items-center justify-center gap-2 rounded bg-white">
        <button
          onClick={() => setPage(1)}
          className={
            "my-1 ml-1 w-full rounded px-4 py-2 hover:bg-gray-100" +
            `${page === 1 && " bg-gray-100 "}`
          }
        >
          Search Songs
        </button>
        <button
          onClick={() => setPage(2)}
          className={
            "mx-1 my-1 w-full rounded px-4 py-2 hover:bg-gray-100" +
            `${page === 2 && " bg-gray-100 "}`
          }
        >
          Create Songs
        </button>
        <button
          onClick={() => setPage(3)}
          className={
            "my-1 mr-1 w-full rounded px-4 py-2 hover:bg-gray-100" +
            `${page === 3 && " bg-gray-100 "}`
          }
        >
          Delete Songs
        </button>
      </div>
      <div className="flex h-full w-full items-center justify-center">
        {page === 1 && <SongList />}
        {page === 2 && <CreateSong />}
        {page === 3 && <DeleteSong />}
      </div>
    </div>
  );
}
