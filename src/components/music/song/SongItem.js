"use client";

import { Ban, Heart } from "lucide-react";
import DeleteButton from "../DeleteButton";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SongItem({ song }) {
  const [songCoverUrl, setSongCoverUrl] = useState("");

  let artists = "Artists";
  try {
    artists = JSON.parse(song.artists.replace(/'/g, '"'));
  } catch (error) {
    console.log(error);
  }

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/songs/cover/${song.id}`, {
      cache: "no-store",
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === "Not found") {
          setSongCoverUrl(null);
        } else {
          setSongCoverUrl(data);
        }
      });
  }, []);

  return (
    <div className="relative my-1 flex w-full items-center gap-2 rounded border-zinc-700 px-2 py-1 transition-colors hover:bg-zinc-800">
      {songCoverUrl && (
        <Image alt="song_cover" width={30} height={30} src={songCoverUrl} />
      )}
      <p className="grow truncate px-2 py-2">{song.name}</p>
      <p className="basis-32 truncate px-2 py-2 opacity-60">{song.year}</p>
      <p className="basis-60 truncate px-2 py-2 opacity-60">{artists}</p>
      <div className="flex items-center gap-3">
        <Heart
          className={"cursor-pointer rounded-full hover:bg-zinc-700"}
          size={25}
          color="#f9fafb"
        />
        <Ban
          className={"cursor-pointer rounded-full hover:bg-zinc-700"}
          size={25}
          color="#f9fafb"
        />
        <DeleteButton
          className={"cursor-pointer rounded-full hover:bg-zinc-700"}
          item={song}
          name={"song"}
          size={25}
        />
      </div>
    </div>
  );
}
