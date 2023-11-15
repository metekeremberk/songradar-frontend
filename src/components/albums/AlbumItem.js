"use client";

import { useState } from "react";

export default function AlbumItem({ index, album }) {
  const [open, setOpen] = useState(false);

  return (
    <li
      key={index + 1}
      className="flex w-full cursor-pointer flex-col items-center rounded bg-white px-4 py-2 text-left"
      onClick={() => setOpen(!open)}
    >
      <div className="flex w-full items-center">
        <div className="basis-2/6 truncate border-r px-2">{album.title}</div>
        <div className="basis-1/6 truncate border-r px-2">{album.genre}</div>
        <div className="basis-2/6 truncate border-r px-2">
          {album.performers}
        </div>
        <div className="basis-1/6 truncate px-2">{album.year}</div>
      </div>
      {album.songs.length !== 0 && (
        <div
          className={
            open
              ? "mt-1 flex w-full flex-col items-center rounded border-t"
              : "h-0 scale-0"
          }
        >
          {album.songs?.map((song) => {
            return (
              <div className="flex w-full items-center py-1">
                <div className="basis-2/6 truncate border-r px-2">
                  {" "}
                  | {song.title}
                </div>
                <div className="basis-1/6 truncate border-r px-2">
                  {song.genre}
                </div>
                <div className="basis-2/6 truncate border-r px-2">
                  {song.performers}
                </div>
                <div className="basis-1/6 truncate px-2">{song.year}</div>
              </div>
            );
          })}
        </div>
      )}
    </li>
  );
}
