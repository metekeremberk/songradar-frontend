"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Upload } from "lucide-react";
import { useSession } from "next-auth/react";

async function createSong(data, session) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/songs`, {
    cache: "no-store",
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${session.accessToken}`,
    },
    body: JSON.stringify(data),
  });

  return response;
}

export default function AddSong({ album, className }) {
  const [response, setResponse] = useState(null);
  const [file, setFile] = useState(undefined);
  const { data: session } = useSession();

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
      album_id: album.id,
    };

    const res = await createSong(data, session);
    setResponse(res);
  }

  async function handleUpload(e) {
    e.preventDefault();
    const content = await file.text();

    try {
      const json = JSON.parse(
        content.replace(/'/g, '"').replace(/(\w+):/g, '"$1":'),
      );

      for (let i = 0; i < json.length; i++) {
        const song = array[i];

        const data = {
          name: song.name,
          artists: JSON.stringify(song.artists),
          year: song.year,
          month: song.month,
          day: song.day,
          album_id: album.id,
        };

        const res = await createSong(data, session);
        setResponse(res);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
  return (
    <div className={className}>
      <Dialog>
        <DialogTrigger>
          <div className="-mb-1.5 p-1">
            <Plus color="#f9fafb" size={30} />
          </div>
        </DialogTrigger>
        <DialogContent className="border-zinc-700 bg-zinc-800 text-gray-100">
          <DialogHeader>
            <DialogTitle>Add a song to {album?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex h-full w-full flex-col items-center justify-center gap-5 px-5 text-gray-100">
            <form
              action={onAction}
              className="flex h-auto min-w-[300px] basis-1/3 flex-col gap-4 rounded border border-zinc-700 bg-zinc-800 p-4"
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
                placeholder="artists"
                required
                className="rounded border border-zinc-700 bg-zinc-500 px-4 py-2 placeholder:text-gray-100"
              />
              {response?.status !== 200 && response !== null && (
                <p className="text-center text-sm text-red-500">
                  Failed: {response.statusText}
                </p>
              )}
              <button
                type="submit"
                className="mt-auto rounded border border-zinc-700 bg-zinc-800 px-4 py-2 text-gray-100 transition-colors hover:bg-zinc-700"
              >
                Create Song
              </button>
            </form>
            <form className="flex basis-2/3">
              <label
                htmlFor="dropzone-file"
                className="cursor-pointer p-2 text-gray-50"
              >
                {file !== undefined && <p>{file.name}</p>}
                {file === undefined && <p>Upload File</p>}
              </label>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept=".txt, .json"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
              <button
                onClick={handleUpload}
                className="rounded border border-zinc-700 bg-zinc-800 p-2 text-zinc-500 transition-colors hover:bg-zinc-700"
              >
                <Upload color="rgb(113,113,122)" size={25} />
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
