"use client";

import DeleteButton from "@/components/music/DeleteButton";
import AddSong from "@/components/music/song/AddSong";
import SongItem from "@/components/music/song/SongItem";
import { ArrowLeft, Music } from "lucide-react";
import { useState, useEffect } from "react";
import Loading from "@/components/loading/Loading";
import { useRouter } from "next/navigation";

export default function page({ params }) {
  const [isLoading, setIsLoading] = useState(false);
  const [album, setAlbum] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/albums/${params.id}`, {
      cache: "no-store",
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAlbum(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="relative grid h-full w-full grid-cols-4 grid-rows-5 bg-zinc-950 text-gray-50">
        <button
          className="absolute left-5 top-5 rounded-full p-2 transition-colors hover:bg-zinc-800"
          onClick={() => {
            router.back();
          }}
        >
          <ArrowLeft color="#f9fafb" size={30} />
        </button>
        <AddSong
          className="absolute right-20 top-5 rounded-full p-2 transition-colors hover:bg-zinc-800"
          album={album}
        />
        <DeleteButton
          className={
            "absolute right-5 top-5 rounded-full p-2 transition-colors hover:bg-zinc-800"
          }
          item={album}
          name={"album"}
        />
        <Music
          color="#064e3b"
          size={200}
          className={
            "row-span-2 m-auto rounded border border-zinc-700 bg-zinc-800 p-1"
          }
        />
        <div className="col-span-3 row-span-2 flex h-full items-end pb-24 text-2xl font-light">
          {album?.name}
        </div>
        <div className="col-span-4 row-span-3 flex flex-col overflow-y-auto border-t border-zinc-700 p-5">
          {album.tracks?.map((song, i) => {
            return <SongItem song={song} key={i} />;
          })}
        </div>
      </div>
    );
  }
}
