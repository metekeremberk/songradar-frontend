"use client";

import AlbumList from "@/components/albums/AlbumList";
import CreateAlbum from "@/components/albums/CreateAlbum";
import DeleteAlbum from "@/components/albums/DeleteAlbum";
import { useState } from "react";

export default function AlbumMenu() {
  const [page, setPage] = useState(1);

  return (
    <div className="flex h-2/3 w-1/3 flex-col justify-between gap-2 rounded border bg-gray-100 p-2">
      <div className="flex w-full items-center justify-center gap-2 rounded bg-white">
        <button
          onClick={() => setPage(1)}
          className={
            "my-1 ml-1 w-full rounded px-4 py-2 hover:bg-gray-100" +
            `${page === 1 && " bg-gray-100 "}`
          }
        >
          Search Albums
        </button>
        <button
          onClick={() => setPage(2)}
          className={
            "mx-1 my-1 w-full rounded px-4 py-2 hover:bg-gray-100" +
            `${page === 2 && " bg-gray-100 "}`
          }
        >
          Create Albums
        </button>
        <button
          onClick={() => setPage(3)}
          className={
            "my-1 mr-1 w-full rounded px-4 py-2 hover:bg-gray-100" +
            `${page === 3 && " bg-gray-100 "}`
          }
        >
          Delete Albums
        </button>
      </div>
      <div className="flex h-full w-full items-center justify-center">
        {page === 1 && <AlbumList />}
        {page === 2 && <CreateAlbum />}
        {page === 3 && <DeleteAlbum />}
      </div>
    </div>
  );
}
