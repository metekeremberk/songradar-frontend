"use client";

import { ArrowLeft, Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

async function createAlbum(data, session) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/albums`,
    {
      cache: "no-store",
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${session.accessToken}`,
      },
      body: JSON.stringify(data),
    },
  );

  return response;
}

export default function AddAlbumPage() {
  const [file, setFile] = useState(undefined);
  const { data: session } = useSession();

  async function handleUpload(e) {
    e.preventDefault();

    try {
      const content = JSON.parse(
        (await file.text()).replace(/'/g, '"').replace(/(\w+):/g, '"$1":'),
      );

      for (let i = 0; i < content.length; i++) {
        const element = content[i];

        if (!element.hasOwnProperty("album_id")) {
          const date = formData.get("year").split("-");
          const year = parseInt(date[0]);
          const month = parseInt(date[1]);
          const day = parseInt(date[2]);

          const artists = formData.get("artists").split(",");

          const data = {
            name: formData.get("name"),
            artists: JSON.stringify(artists),
            year: year,
            month: month,
            day: day,
          };

          const res = await createAlbum(data, session);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function onAction(formData) {
    const date = formData.get("year").split("-");
    const year = parseInt(date[0]);
    const month = parseInt(date[1]);
    const day = parseInt(date[2]);

    const artists = formData.get("artists").split(",");

    const data = {
      name: formData.get("name"),
      artists: JSON.stringify(artists),
      year: year,
      month: month,
      day: day,
    };

    const res = await createAlbum(data, session);
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-4/5 w-4/5 flex-col gap-5 rounded-xl border border-zinc-800 bg-zinc-900 p-10 shadow-equal-lg shadow-zinc-800/50">
        <div className="flex items-center gap-5">
          <Link href={"./"} className="rounded-full">
            <ArrowLeft />
          </Link>
          <p className="text-xl">Add Album</p>
        </div>
        <div className="flex h-full w-full items-center justify-between gap-10">
          <form className="h-full flex-grow" onSubmit={handleUpload}>
            <label
              htmlFor="dropzone-file"
              className="flex h-full w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-700 bg-zinc-900"
            >
              {file === undefined && (
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <Upload color="rgb(113,113,122)" size={25} />
                  <p className="mb-2 text-sm text-zinc-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-zinc-500">JSON or TXT</p>
                </div>
              )}
              {file !== undefined && (
                <div className="flex flex-col items-center justify-center gap-10 pb-6 pt-5">
                  <div>{file.name}</div>
                  <button
                    type="submit"
                    className="flex gap-2 rounded border border-zinc-700 bg-zinc-300 px-4 py-2 text-zinc-800 transition-colors hover:bg-zinc-400"
                  >
                    Upload <Upload />
                  </button>
                </div>
              )}

              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept=".txt, .json"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </form>
          <div className="flex h-full flex-col justify-around">
            <form
              action={onAction}
              className="flex flex-col gap-4 rounded border border-zinc-700 p-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="rounded border border-zinc-700 bg-zinc-500 px-4 py-2 placeholder:text-gray-100"
              />
              <input
                type="date"
                name="year"
                placeholder="Year"
                required
                className="rounded border border-zinc-700 bg-zinc-500 px-4 py-2 placeholder:text-gray-100"
              />
              <input
                type="text"
                name="artists"
                placeholder="Artists"
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
            <button>Add from database</button>
          </div>
        </div>
      </div>
    </div>
  );
}
