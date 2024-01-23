import { Music, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function PersonalPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <Link
        href={"/personal/add/albums"}
        className="flex h-1/6 w-2/3 items-center justify-start gap-10 rounded-lg border border-zinc-800 bg-zinc-900 p-10 shadow-equal shadow-zinc-700/70 transition-colors hover:bg-zinc-800"
      >
        <Plus className="aspect-square h-full w-auto" />
        <p className="text-xl">Add new album</p>
      </Link>
      <Link
        href={"/personal/add/songs"}
        className="flex h-1/6 w-2/3 items-center justify-start gap-10 rounded-lg border border-zinc-800 bg-zinc-900 p-10 shadow-equal shadow-zinc-700/70 transition-colors hover:bg-zinc-800"
      >
        <Plus className="aspect-square h-full w-auto" />
        <p className="text-xl">Add new songs</p>
      </Link>
      {/* <Link
        href={"/personal/add/artists"}
        className="flex h-1/6 w-2/3 items-center justify-start gap-10 rounded-lg border border-zinc-800 bg-zinc-900 p-10 shadow-equal shadow-zinc-700/70 transition-colors hover:bg-zinc-800"
      >
        <Plus className="aspect-square h-full w-auto" />
        <p className="text-xl">Add new artists</p>
      </Link> */}
    </div>
  );
}
