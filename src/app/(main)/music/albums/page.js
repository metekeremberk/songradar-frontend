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
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(0);
  const [genre, setGenre] = useState("");
  const [performers, setPerformers] = useState("");
  const [file, setFile] = useState(undefined);

  async function onAction() {
    const data = {
      title: title,
      year: year,
      genre: genre,
      performers: performers,
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
        const album = array[i];
        setTitle(album.title);
        setGenre(album.genre);
        setPerformers(album.performers);
        setYear(album.year);
        onAction();
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
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="number"
                name="year"
                placeholder="Year"
                required
                className="rounded border border-zinc-700 bg-zinc-500 px-4 py-2 placeholder:text-gray-100"
                onChange={(e) => setYear(parseInt(e.target.value))}
              />
              <input
                type="text"
                name="genre"
                placeholder="Genre"
                required
                className="rounded border border-zinc-700 bg-zinc-500 px-4 py-2 placeholder:text-gray-100"
                onChange={(e) => setGenre(e.target.value)}
              />
              <input
                type="text"
                name="performers"
                placeholder="Performers"
                required
                className="rounded border border-zinc-700 bg-zinc-500 px-4 py-2 placeholder:text-gray-100"
                onChange={(e) => setPerformers(e.target.value)}
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
    <div className="grid w-full grid-cols-7 items-center gap-5 overflow-y-auto bg-zinc-950 p-5">
      <AddAlbum
        createAlbum={createAlbum}
        className={
          "h-full min-h-[150px] w-full rounded border border-zinc-700 bg-zinc-800 text-gray-50"
        }
      />
      {albums.length === 0 && <p key={0}>There are no albums.</p>}
      {albums.length > 0 && (
        <>
          {albums?.map((album, i) => {
            return (
              <Link
                className="h-full min-h-[150px] w-full rounded border border-zinc-700 bg-zinc-800 text-gray-50"
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
  );
}
