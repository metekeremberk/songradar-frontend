"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import MusicButton from "@/components/music/MusicButton";
import MusicCard from "@/components/music/MusicCard";

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
          <MusicButton />
          <MusicButton />
          <MusicButton />
          <MusicButton />
          <MusicButton />
          <MusicButton />
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 border-b border-zinc-700 py-4">
        <div className="flex justify-between">
          <p className="text-xl">Songs</p>
          <Link href={"/songs"} className="text-gray-400 hover:underline">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          <MusicButton />
          <MusicButton />
          <MusicButton />
          <MusicButton />
          <MusicButton />
          <MusicButton />
          <MusicButton />
          <MusicButton />
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 border-b border-zinc-700 py-4">
        <div className="flex justify-between">
          <p className="text-xl">Playlists</p>
          <Link href={"/playlists"} className="text-gray-400 hover:underline">
            See all
          </Link>
        </div>
        <div className="flex justify-between gap-3 overflow-x-auto">
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 border-b border-zinc-700 py-4">
        <div className="flex justify-between">
          <p className="text-xl">Albums</p>
          <Link href={"/albums"} className="text-gray-400 hover:underline">
            See all
          </Link>
        </div>
        <div className="flex justify-between gap-3 overflow-x-auto">
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 border-b border-zinc-700 py-4">
        <div className="flex justify-between">
          <p className="text-xl">Performers</p>
          <Link href={"/performers"} className="text-gray-400 hover:underline">
            See all
          </Link>
        </div>
        <div className="flex justify-between gap-3 overflow-x-auto">
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
        </div>
      </div>
    </main>
  );
}
