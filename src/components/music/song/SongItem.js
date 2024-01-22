"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SongItemMenu from "@/components/search/songs/SongItemMenu";
import Link from "next/link";

export default function SongItem({ song, playlists }) {
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
    <Link
      href={"/songs/" + song.id}
      className="relative my-1 flex w-full items-center gap-2 rounded border-zinc-700 px-2 py-1 transition-colors hover:bg-zinc-800"
    >
      {songCoverUrl && (
        <Image alt="song_cover" width={30} height={30} src={songCoverUrl} />
      )}
      <p className="grow truncate px-2 py-2">{song.name}</p>
      <p className="basis-32 truncate px-2 py-2 opacity-60">{song.year}</p>
      <p className="basis-60 truncate px-2 py-2 opacity-60">{artists}</p>
      <SongItemMenu track={song} playlists={playlists} />
    </Link>
  );
}
