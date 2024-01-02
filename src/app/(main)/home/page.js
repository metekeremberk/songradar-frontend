"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import Songs from "@/components/home/Songs";
import Albums from "@/components/home/Albums";
import Artists from "@/components/home/Artists";
import Playlists from "@/components/home/Playlists";
import SongCard from "@/components/music/SongCard";

function getRandomNumber(min, max) {
  const randomFraction = Math.random();

  const randomInRange = min + randomFraction * (max - min);

  return Math.round(randomInRange);
}

export default function Home() {
  const { data: session } = useSession();
  const user = session.user;

  return (
    <main className="flex h-full w-full flex-col items-center overflow-y-auto px-8 py-4 text-gray-50">
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
          <SongCard />
          <SongCard />
          <SongCard />
          <SongCard />
          <SongCard />
          <SongCard />
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 border-b border-zinc-700 py-4">
        <div className="flex justify-between">
          <p className="text-xl">Songs</p>
          <Link href={"/songs"} className="text-gray-400 hover:underline">
            See all
          </Link>
        </div>
        <Songs skip={getRandomNumber(1, 1000000)} />
      </div>
      <div className="flex w-full flex-col gap-3 border-b border-zinc-700 py-4">
        <div className="flex justify-between">
          <p className="text-xl">Playlists</p>
          <Link href={"/playlists"} className="text-gray-400 hover:underline">
            See all
          </Link>
        </div>
        <Playlists skip={getRandomNumber(1, 110000)} />
      </div>
      <div className="flex w-full flex-col gap-3 border-b border-zinc-700 py-4">
        <div className="flex justify-between">
          <p className="text-xl">Albums</p>
          <Link href={"/albums"} className="text-gray-400 hover:underline">
            See all
          </Link>
        </div>
        <Albums skip={getRandomNumber(1, 110000)} />
      </div>
      <div className="flex w-full flex-col gap-3 border-b border-zinc-700 py-4">
        <div className="flex justify-between">
          <p className="text-xl">Artists</p>
          <Link href={"/artists"} className="text-gray-400 hover:underline">
            See all
          </Link>
        </div>
        <Artists skip={getRandomNumber(1, 110000)} />
      </div>
    </main>
  );
}
