"use client";

import { songContext } from "@/context/songContext";
import { useContext } from "react";

export default function DeleteAlbum() {
  const { songs, deleteSongs } = useContext(songContext);
  return (
    <form
      action={deleteSongs}
      className="flex min-w-[300px] flex-col gap-4 rounded border bg-gray-50 p-4 shadow child:rounded child:border child:px-4 child:py-2"
    >
      <select name="song" defaultValue={"default"}>
        <option value={"default"} disabled>
          Select song
        </option>
        {songs?.map((song, index) => {
          return (
            <option value={JSON.stringify(song)} key={index}>
              {song.title}
            </option>
          );
        })}
      </select>
      <button type="submit" className="bg-gray-800 text-gray-50 ">
        Delete song
      </button>
    </form>
  );
}
