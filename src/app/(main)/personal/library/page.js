"use client";

import Loading from "@/components/loading/Loading";
import AlbumCard from "@/components/music/AlbumCard";
import SongCard from "@/components/music/SongCard";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function LibraryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/albums/user?skip=0&limit=100`,
      {
        cache: "no-store",
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${session.accessToken}`,
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data);
        setIsLoading(false);
      });

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/songs/user?skip=0&limit=100`,
      {
        cache: "no-store",
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${session.accessToken}`,
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        setSongs(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="flex h-full w-full overflow-hidden p-4">
        <div className="h-full basis-1/2">
          <p className="border-b border-zinc-700 py-4 text-2xl">Your albums</p>
          <div className="grid grid-cols-3 gap-5 p-5">
            {albums.map((album, i) => {
              return <AlbumCard key={i} album={album} />;
            })}
          </div>
        </div>
        <div className="h-full basis-1/2">
          <p className="border-b border-zinc-700 py-4 text-2xl">Your songs</p>
          <div className="grid grid-cols-1 gap-5 p-5">
            {songs.map((song, i) => {
              return <SongCard key={i} song={song} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}
