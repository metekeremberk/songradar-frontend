"use client";

import { albumContext } from "@/context/albumContext";
import { useContext } from "react";

export default function AlbumList() {
  const { albums } = useContext(albumContext);

  return (
    <ul className="h-[415px] w-full space-y-2 overflow-y-auto">
      {albums.length === 0 && <li key={0}>There are no albums.</li>}
      {albums.length > 0 && (
        <>
          <li
            key={0}
            className="sticky top-0 flex w-full items-center rounded bg-white px-4 py-2 text-center shadow"
          >
            <div className="basis-2/6 truncate border-r px-2">Title</div>
            <div className="basis-1/6 truncate border-r px-2">Genre</div>
            <div className="basis-2/6 truncate border-r px-2">Performers</div>
            <div className="basis-1/6 truncate px-2">Year</div>
          </li>
          {albums?.map((album, index) => {
            return (
              <li
                key={index + 1}
                className="flex w-full items-center rounded bg-white px-4 py-2 text-left"
              >
                <div className="basis-2/6 truncate border-r px-2">
                  {album.title}
                </div>
                <div className="basis-1/6 truncate border-r px-2">
                  {album.genre}
                </div>
                <div className="basis-2/6 truncate border-r px-2">
                  {album.performers}
                </div>
                <div className="basis-1/6 truncate px-2">{album.year}</div>
              </li>
            );
          })}
        </>
      )}
    </ul>
  );
}
