"use client";

import Loading from "@/components/loading/Loading";
import SongItem from "@/components/music/song/SongItem";
import MoreMenu from "@/components/playlists/MoreMenu";
import { getColorPairing } from "@/lib/colorPair";
import { Dot } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PlaylistPage({ params }) {
  const [isLoading, setIsLoading] = useState(false);
  const [playlist, setPlaylist] = useState({});
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/playlists/${params.id}`, {
      cache: "no-store",
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data )
        setPlaylist(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="grid h-full w-full grid-cols-1 grid-rows-5 text-gray-50">
        <div className="row-span-2 flex w-full justify-between gap-4 p-4">
          <div className="flex grow justify-start gap-4 px-8">
            <div
              color="#064e3b"
              className="row-span-2 m-auto aspect-square w-48 flex-none rounded bg-zinc-800 p-1"
            />
            <div className="col-span-3 row-span-2 flex h-full grow flex-col items-start justify-center pt-20  font-light">
              <p className="text-2xl">{playlist?.name}</p>
              <div className="flex items-center gap-2">
                <p className="text-lg opacity-60">Playlist</p>
                <Dot className="opacity-60" />
                <p className="text-lg opacity-60">
                  {playlist?.songs?.length} songs
                </p>
                <Dot className="opacity-60" />
                <MoreMenu id={params.id} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 row-span-3 flex flex-col overflow-y-auto border-t border-zinc-700 p-5">
          {playlist?.songs?.map((song, i) => {
            return (
              <SongItem song={song} key={i} gradient={getColorPairing(song)} />
            );
          })}
        </div>
      </div>
    );
  }
}
