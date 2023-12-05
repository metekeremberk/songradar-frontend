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
import PlusSVG from "@/components/svg/PlusSVG";
import MusicSVG from "@/components/svg/MusicSVG";
import MinusSVG from "@/components/svg/MinusSVG";
import BackSVG from "@/components/svg/BackSVG";
import StarSVG from "@/components/svg/StarSVG";
import UploadSVG from "@/components/svg/UploadSVG";
import { albumContext } from "@/context/albumContext";
import { songContext } from "@/context/songContext";
import ThrashSVG from "@/components/svg/ThrashSVG";

function AddSong({ album, className, createSong }) {
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
      album_id: album.id,
    };

    const res = await createSong(data);
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
        setTitle(song.title);
        setGenre(song.genre);
        setPerformers(song.performers);
        setYear(song.year);
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
        <DialogTrigger>
          <div className="-mb-1.5 p-1">
            <PlusSVG color="#f9fafb" size={30} />
          </div>
        </DialogTrigger>
        <DialogContent className="border-zinc-700 bg-zinc-800 text-gray-100">
          <DialogHeader>
            <DialogTitle>Add a song to {album?.title}</DialogTitle>
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
                <UploadSVG color="rgb(113,113,122)" size={25} />
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function page({ params }) {
  const { albums } = useContext(albumContext);
  const { createSong, deleteSong } = useContext(songContext);

  const album = albums.find((item) => item.id === Number(params.id));
  return (
    <div className="relative grid h-full w-full grid-cols-4 grid-rows-5 bg-zinc-950 text-gray-50">
      <Link
        className="absolute left-5 top-5 rounded-full p-2 transition-colors hover:bg-zinc-800"
        href={"./"}
      >
        <BackSVG color="#f9fafb" size={30} />
      </Link>
      <AddSong
        className="absolute right-5 top-5 rounded-full p-2 transition-colors hover:bg-zinc-800"
        album={album}
        createSong={createSong}
      />
      <MusicSVG
        color="#064e3b"
        size={200}
        className={
          "row-span-2 m-auto rounded border border-zinc-700 bg-zinc-800 p-1"
        }
      />
      <div className="col-span-3 row-span-2 flex h-full items-end pb-24 text-2xl font-light">
        {album?.title}
      </div>
      <div className="col-span-4 row-span-3 flex flex-col overflow-y-auto border-t border-zinc-700 p-5">
        {album?.songs.map((song, i) => {
          return (
            <div
              className="relative grid w-full grid-cols-4 border-t border-zinc-700 p-4 transition-colors hover:bg-zinc-800"
              key={i}
            >
              <p className="truncate px-2">{song.title}</p>
              <p className="truncate border-l border-zinc-700 px-2">
                {song.year}
              </p>
              <p className="truncate border-l border-zinc-700 px-2">
                {song.genre}
              </p>
              <p className="truncate border-l border-zinc-700 px-2">
                {song.performers}
              </p>
              <StarSVG
                className={
                  "absolute right-24 mt-4 cursor-pointer rounded-full hover:bg-zinc-700"
                }
                size={25}
                color="#f9fafb"
              />
              <MinusSVG
                className={
                  "absolute right-14 mt-4 cursor-pointer rounded-full hover:bg-zinc-700"
                }
                size={25}
                color="#f9fafb"
              />
              <ThrashSVG
                className={
                  "absolute right-5 mt-4 cursor-pointer rounded-full hover:bg-zinc-700"
                }
                size={25}
                color="#f9fafb"
                onClick={(e) => deleteSong(song.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
