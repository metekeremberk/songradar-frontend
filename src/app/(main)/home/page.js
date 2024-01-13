"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import Songs from "@/components/home/Songs";
import Albums from "@/components/home/Albums";
import Playlists from "@/components/home/Playlists";
import SongCard from "@/components/music/SongCard";

function RecommendedSong({
  music = { name: "Song/Album", artists: "['Artists']" },
  gradient = " bg-zinc-800 ",
}) {
  let artists = "Artists";
  try {
    artists = JSON.parse(music.artists.replace(/'/g, '"'));
  } catch (error) {
    console.log(error);
  }
  return (
    <div className="flex h-16 items-center gap-5 rounded bg-zinc-800 transition-colors hover:bg-zinc-700">
      <div className={"h-16 w-16 min-w-[64px] rounded-l" + gradient} />

      <div className="p-2">
        <p className="line-clamp-1 text-lg font-light">{music.name}</p>
        <p className="line-clamp-1 opacity-60">{artists.toString()}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const { data: session } = useSession();
  const user = session.user;

  return (
    <div className="flex h-full w-full flex-col items-center overflow-hidden overflow-y-auto px-8 py-4 text-gray-50">
      <div className="flex w-full flex-col gap-3 border-b border-zinc-700 pb-4">
        <div className="flex justify-between">
          <p className="text-xl">Recommendations for {user.name}</p>
          <Link
            href={"/recommendations"}
            className="text-gray-400 hover:underline"
          >
            See all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
          <RecommendedSong />
          <RecommendedSong />
          <RecommendedSong />
          <RecommendedSong />
          <RecommendedSong />
          <RecommendedSong />
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 border-b border-zinc-700 py-4">
        <div className="flex justify-between">
          <p className="text-xl">Playlists</p>
          <Link href={"/playlists"} className="text-gray-400 hover:underline">
            See all
          </Link>
        </div>
        <Playlists />
      </div>
      <div className="flex w-full flex-col gap-3 border-b border-zinc-700 py-4">
        <div className="flex justify-between">
          <p className="text-xl">Songs</p>
        </div>
        <Songs />
      </div>
      <div className="flex w-full flex-col gap-3 border-b border-zinc-700 py-4">
        <div className="flex justify-between">
          <p className="text-xl">Albums</p>
        </div>
        <Albums />
      </div>
    </div>
  );
}
