"use client";

import { useEffect, useState } from "react";
import SongItemMenu from "./SongItemMenu";
import Image from "next/image";
import Link from "next/link";
import jsonFix from "@/lib/jsonfix";

export default function SongItem({ song, playlists }) {
  const [songCoverUrl, setSongCoverUrl] = useState(null);

  let artists = "Artists";
  try {
    artists = JSON.parse(jsonFix(song.artists));
  } catch (error) {
    console.log(error);
  }

  function getSongCover() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/songs/cover/${song?.id}`, {
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
  }

  useEffect(() => {
    getSongCover();
  }, []);

  return (
    <Link
      href={"/songs/" + song.id}
      className="grid grid-cols-8 items-center gap-3 rounded p-2 transition-colors hover:bg-zinc-800"
    >
      <div className={"h-8 w-8 min-w-[32px] rounded-l"}>
        {songCoverUrl && (
          <Image
            src={songCoverUrl}
            alt="song_cover"
            width={150}
            height={150}
            className="rounded"
          />
        )}
      </div>
      <div className="col-span-3 truncate">{song.name}</div>
      <div className="col-span-2 truncate text-sm font-light opacity-60">
        {artists.toString()}
      </div>
      <div className="truncate text-sm font-light opacity-60">{song.year}</div>
      <div className="flex items-center justify-center">
        <SongItemMenu track={song} playlists={playlists} />
      </div>
    </Link>
  );
}
