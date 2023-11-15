"use client";

import AlbumList from "@/components/albums/AlbumList";
import CreateAlbum from "@/components/albums/CreateAlbum";
import DeleteAlbum from "@/components/albums/DeleteAlbum";
import { useState } from "react";

const buttons = [
  { number: 1, title: "Search Albums" },
  { number: 2, title: "Create Albums" },
  { number: 3, title: "Delete Albums" },
];

export default function AlbumMenu() {
  const [page, setPage] = useState(1);

  return (
    <div className="flex h-2/3 w-2/3 flex-col justify-between gap-2 rounded border bg-gray-100 p-2">
      <div className="flex w-full items-center justify-center gap-2 rounded bg-white">
        {buttons.map((button, i) => {
          return (
            <button
              key={i}
              onClick={() => setPage(button.number)}
              className={
                "my-1 ml-1 w-full rounded px-4 py-2 hover:bg-gray-100 " +
                `${page === button.number && " bg-gray-100 "}`
              }
            >
              {button.title}
            </button>
          );
        })}
      </div>
      <div className="flex h-full w-full items-center justify-center">
        {page === 1 && <AlbumList />}
        {page === 2 && <CreateAlbum />}
        {page === 3 && <DeleteAlbum />}
      </div>
    </div>
  );
}
