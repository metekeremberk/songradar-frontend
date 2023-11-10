"use client";

import { Context } from "@/context/albumContext";
import { useContext } from "react";

export default function CreateAlbum() {
  const { createAlbum } = useContext(Context);
  return (
    <form
      action={createAlbum}
      className="my-auto flex min-w-[300px] flex-col gap-4 rounded border bg-gray-50 p-4 shadow child:rounded child:border child:px-4 child:py-2"
    >
      <input type="text" name="title" placeholder="Title" required />
      <input type="number" name="year" placeholder="Year" required />
      <input type="text" name="genre" placeholder="Genre" required />
      <input type="text" name="performers" placeholder="Performers" required />
      <button type="submit" className="bg-gray-800 text-gray-50 ">
        Create
      </button>
    </form>
  );
}
