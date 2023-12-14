"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function page() {
  const { data: session, status } = useSession();
  return (
    <div className="flex h-full w-full items-center bg-gradient-to-br from-zinc-950 to-zinc-700 px-40">
      <div className="basis-2/3">
        <p className="text-8xl font-black">Song</p>
        <p className="text-8xl font-black">Radar</p>
        <p className="w-2/3 text-ellipsis text-gray-400">
          Embark on a musical journey like never before with SongRadar. This
          innovative app collects liked-song data from your favorite platforms,
          creating a unified hub for your diverse musical tastes.
        </p>
      </div>
      <div className="flex w-full basis-1/3 justify-center pt-40">
        {status === "authenticated" && (
          <Link
            href={"/home"}
            className="rounded border border-zinc-400 bg-gray-50 px-4 py-2 text-zinc-800 transition-colors hover:bg-zinc-400"
          >
            Home
          </Link>
        )}
        {status !== "authenticated" && (
          <Link
            href={"/auth/signin"}
            className="rounded border border-zinc-400 bg-gray-50 px-4 py-2 text-zinc-800 transition-colors hover:bg-zinc-400"
          >
            Try it out!
          </Link>
        )}
      </div>
    </div>
  );
}
