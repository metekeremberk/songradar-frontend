import { Disc3, Music, UserPlus } from "lucide-react";
import Link from "next/link";

export default function AddPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <Link
        href={"/add/album"}
        className="flex h-1/6 w-2/3 items-center justify-start gap-10 rounded-lg border border-zinc-800 bg-zinc-900 p-10 shadow-equal shadow-zinc-700/70 transition-colors hover:bg-zinc-800"
      >
        <Disc3 className="aspect-square h-full w-auto" />
        <p className="text-xl">Add Albums</p>
      </Link>
      <Link
        href={"/add/song"}
        className="flex h-1/6 w-2/3 items-center justify-start gap-10 rounded-lg border border-zinc-800 bg-zinc-900 p-10 shadow-equal shadow-zinc-700/70 transition-colors hover:bg-zinc-800"
      >
        <Music className="aspect-square h-full w-auto" />
        <p className="text-xl">Add Songs</p>
      </Link>
      <Link
        href={"/add/performer"}
        className="flex h-1/6 w-2/3 items-center justify-start gap-10 rounded-lg border border-zinc-800 bg-zinc-900 p-10 shadow-equal shadow-zinc-700/70 transition-colors hover:bg-zinc-800"
      >
        <UserPlus className="aspect-square h-full w-auto" />
        <p className="text-xl">Add Performers</p>
      </Link>
    </div>
  );
}
