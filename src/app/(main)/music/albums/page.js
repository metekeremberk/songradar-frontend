"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { albumContext } from "@/context/albumContext";
import PlusSVG from "@/components/svg/PlusSVG";
import UploadSVG from "@/components/svg/UploadSVG";

function AddAlbum({ className, createAlbum }) {
  const [response, setResponse] = useState(null);
  const [file, setFile] = useState(undefined);

  async function onAction(formData) {
    const data = {
      title: formData.get("title"),
      year: parseInt(formData.get("year")),
      genre: formData.get("genre"),
      performers: formData.get("performers"),
    };

    const res = await createAlbum(data);
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
        const album = json[i];

        const res = await createAlbum(album);
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
        <DialogTrigger className="h-full w-full">
          <PlusSVG color="#f9fafb" size={30} className={"m-auto"} />
          <p className="-mb-7 pt-5">Create a new album</p>
        </DialogTrigger>
        <DialogContent className="border-zinc-700 bg-zinc-800 text-gray-100">
          <DialogHeader>
            <DialogTitle>Create an album</DialogTitle>
          </DialogHeader>
          <div className="flex h-full w-full flex-col items-center justify-center gap-5 px-5 text-gray-100">
            <form
              action={onAction}
              className="flex h-auto min-w-[300px] basis-1/3 flex-col gap-4 rounded border border-zinc-700 bg-zinc-800 p-4"
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
              {response?.status !== 200 && response !== null && (
                <p className="text-center text-sm text-red-500">
                  Failed: {response.statusText}
                </p>
              )}
              <button
                type="submit"
                className="mt-auto rounded border border-zinc-700 bg-zinc-800 px-4 py-2 text-gray-100 transition-colors hover:bg-zinc-700"
              >
                Create Album
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
                <UploadSVG color="rgb(113,113,122)" size={25} />
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function Page() {
  const { albums, createAlbum } = useContext(albumContext);
  return (
    <div className="h-full w-full overflow-y-auto bg-zinc-950">
      <div className="grid w-full grid-cols-7 items-center gap-5 p-5">
        <AddAlbum
          createAlbum={createAlbum}
          className={
            "aspect-square w-[1/7] rounded border border-zinc-700 bg-zinc-800 text-gray-50"
          }
        />
        {albums.length === 0 && <p key={0}>There are no albums.</p>}
        {albums.length > 0 && (
          <>
            {albums?.map((album, i) => {
              return (
                <Link
                  className="aspect-square w-[1/7] rounded border border-zinc-700 bg-zinc-800 text-gray-50"
                  key={i}
                  href={"./albums/" + album.id}
                >
                  <p>{album.title}</p>
                </Link>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
