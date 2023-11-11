"use client";

import { albumContext } from "@/context/albumContext";
import { useContext } from "react";

export default function DeleteAlbum() {
  const { albums, deleteAlbum } = useContext(albumContext);
  return (
    <form
      action={deleteAlbum}
      className="flex min-w-[300px] flex-col gap-4 rounded border bg-gray-50 p-4 shadow child:rounded child:border child:px-4 child:py-2"
    >
      <select
        placeholder="Select album"
        defaultValue={"Select album"}
        name="album"
      >
        <option value={"default"}>Select album</option>
        {albums?.map((album, index) => {
          return (
            <option value={JSON.stringify(album)} key={index}>
              {album.title}
            </option>
          );
        })}
      </select>
      <button type="submit" className="bg-gray-800 text-gray-50 ">
        Delete album
      </button>
    </form>
  );
}
