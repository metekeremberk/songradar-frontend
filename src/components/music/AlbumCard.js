"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";

export default function AlbumCard({ music }) {
  const [isLoading, setIsLoading] = useState(true);
  const [albumCoverUrl, setAlbumCoverUrl] = useState("");

  let artists = "Artists";
  try {
    artists = JSON.parse(music.artists.replace(/'/g, '"'));
  } catch (error) {
    console.log(error);
  }

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/albums/cover/${music.id}`, {
      cache: "no-store",
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAlbumCoverUrl(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Link
        className="flex min-w-[160px] basis-[12.5%] flex-col items-start rounded bg-zinc-800 p-2.5 transition-colors hover:bg-zinc-700"
        href={"/albums/" + music.id}
      >
        <div className={"mb-3 aspect-square h-auto w-full rounded "}>
          <Image
            src={albumCoverUrl}
            alt="album_cover"
            width={300}
            height={300}
          />
        </div>
        <p className="line-clamp-1 text-lg font-light">{music.name}</p>
        <p className="line-clamp-1 opacity-60">{artists.toString()}</p>
      </Link>
    );
  }
}
