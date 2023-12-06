"use client";

import Link from "next/link";
import MusicSVG from "@/components/svg/MusicSVG";
import { useContext } from "react";
import { AuthContext } from "@/context/userContext";

function MusicButton() {
  return (
    <Link
      className="flex h-16 items-center gap-5 rounded bg-zinc-800 transition-colors hover:bg-zinc-700"
      href={"/"}
    >
      <MusicSVG
        color="#064e3b"
        className={"h-full w-auto rounded-l bg-zinc-800 p-1 shadow-equal-md"}
      />
      <p className="truncate text-lg font-light">Album/Song</p>
    </Link>
  );
}

function MusicCard() {
  return (
    <Link
      className="flex w-40 flex-col items-start rounded bg-zinc-800 p-2.5 transition-colors hover:bg-zinc-700"
      href={"/"}
    >
      <MusicSVG
        color="#064e3b"
        className={"h-auto w-full rounded bg-zinc-800  shadow-equal-md"}
      />
      <p className="truncate pt-2 text-lg font-light">Album/Song</p>
      <p className="truncate text-sm font-light opacity-50">Performers</p>
    </Link>
  );
}

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <main className="flex h-full w-full flex-col items-center overflow-y-auto bg-zinc-950 px-8 py-4 text-gray-50">
      <div className="flex w-full flex-col gap-3 border-b border-zinc-700 pb-4">
        <div className="flex justify-between">
          <p className="text-xl">Recommendations for {user?.username}</p>
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
    </main>
  );
}
