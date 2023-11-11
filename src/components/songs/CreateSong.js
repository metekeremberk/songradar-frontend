"use client";

import { albumContext } from "@/context/albumContext";
import { songContext } from "@/context/songContext";
import { useContext } from "react";

export default function CreateAlbum() {
  const { createSong } = useContext(songContext);
  const { albums } = useContext(albumContext);

  return (
    <form
      action={createSong}
      className="my-auto flex min-w-[300px] flex-col gap-4 rounded border bg-gray-50 p-4 shadow child:rounded child:border child:px-4 child:py-2"
    >
      <input type="text" name="title" placeholder="Title" required />
      <input type="number" name="year" placeholder="Year" required />
      <input type="text" name="genre" placeholder="Genre" required />
      <input type="text" name="performers" placeholder="Performers" required />
      <select defaultValue={"Select album"} name="album_id">
        <option value={"default"}>Select album</option>
        {albums?.map((album, index) => {
          return (
            <option value={album.id} key={index}>
              {album.title}
            </option>
          );
        })}
      </select>
      <button type="submit" className="bg-gray-800 text-gray-50 ">
        Create
      </button>
    </form>
  );
}