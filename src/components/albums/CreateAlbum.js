"use client";

import { albumContext } from "@/context/albumContext";
import { useContext } from "react";
import UploadSVG from "../svg/UploadSVG";

export default function CreateAlbum() {
  const { createAlbum } = useContext(albumContext);
  return (
    <div className="flex h-full w-full items-center justify-around gap-5 px-5 text-gray-100">
      <form className="basis-2/3">
        <label
          for="dropzone-file"
          class="flex h-80 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
        >
          <div class="flex flex-col items-center justify-center pb-6 pt-5">
            <UploadSVG color="rgb(113,113,122)" size={25} />
            <p class="mb-2 text-sm text-zinc-500">
              <span class="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p class="text-xs text-zinc-500">JSON or TXT</p>
          </div>
          <input id="dropzone-file" type="file" class="hidden" />
        </label>
      </form>
      <form
        action={createAlbum}
        className="flex h-80 min-w-[300px] basis-1/3 flex-col gap-4 rounded border border-zinc-700 bg-zinc-800 p-4 "
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          className="rounded border border-zinc-700 bg-zinc-500 px-4 py-2 placeholder:text-gray-100"
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          required
          className="rounded border border-zinc-700 bg-zinc-500 px-4 py-2 placeholder:text-gray-100"
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          required
          className="rounded border border-zinc-700 bg-zinc-500 px-4 py-2 placeholder:text-gray-100"
        />
        <input
          type="text"
          name="performers"
          placeholder="Performers"
          required
          className="rounded border border-zinc-700 bg-zinc-500 px-4 py-2 placeholder:text-gray-100"
        />
        <button
          type="submit"
          className="mt-auto rounded border border-zinc-700 bg-zinc-800 px-4 py-2 text-gray-100 transition-colors hover:bg-zinc-700"
        >
          Create Album
        </button>
      </form>
    </div>
  );
}
