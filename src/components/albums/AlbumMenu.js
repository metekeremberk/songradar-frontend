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
    <div className="flex h-2/3 w-2/3 flex-col justify-between gap-2 rounded p-2">
      <div className="flex w-full items-center justify-center gap-1 rounded bg-zinc-600 p-1 text-gray-100">
        {buttons.map((button, i) => {
          return (
            <button
              key={i}
              onClick={() => setPage(button.number)}
              className={
                "w-full rounded px-4 py-2 transition-colors hover:bg-zinc-800 " +
                `${page === button.number ? " bg-zinc-700 " : "bg-zinc-900"}`
              }
            >
              {button.title}
            </button>
          );
        })}
      </div>
      <div className="flex h-full w-full items-center justify-center rounded border border-zinc-700 bg-zinc-900 p-3">
        {page === 1 && <AlbumList />}
        {page === 2 && <CreateAlbum />}
        {page === 3 && <DeleteAlbum />}
      </div>
    </div>
  );
}
