"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import AlbumItemMenu from "./AlbumItemMenu";
import Image from "next/image";
import jsonFix from "@/lib/jsonfix";

export default function AlbumItem({ album }) {
  const [albumCoverUrl, setAlbumCoverUrl] = useState(null);

  let artists = "Artists";
  try {
    artists = JSON.parse(jsonFix(album.artists));
  } catch (error) {
    console.log(error);
  }

  function getAlbumCover() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/albums/cover/${album?.id}`, {
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
          setAlbumCoverUrl(null);
        } else {
          setAlbumCoverUrl(data);
        }
      });
  }

  useEffect(() => {
    getAlbumCover();
  }, []);

  return (
    <Link
      href={`/albums/${album.id}`}
      className="grid grid-cols-8 items-center gap-3 rounded p-2 transition-colors hover:bg-zinc-800"
    >
      <div className={"h-8 w-8 min-w-[32px] rounded-l"}>
        {albumCoverUrl && (
          <Image
            src={albumCoverUrl}
            alt="song_cover"
            width={150}
            height={150}
            className="rounded"
          />
        )}
      </div>
      <div className="col-span-3 truncate">{album.name}</div>
      <div className="col-span-2 truncate text-sm font-light opacity-60">
        {artists.toString()}
      </div>
      <div className="truncate text-sm font-light opacity-60">{album.year}</div>
      <div className="flex items-center justify-center">
        <AlbumItemMenu album={album} />
      </div>
    </Link>
  );
}
