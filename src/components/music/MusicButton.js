import { Music } from "lucide-react";
import Link from "next/link";

export default function MusicButton() {
  return (
    <Link
      className="flex h-16 items-center gap-5 rounded bg-zinc-800 transition-colors hover:bg-zinc-700"
      href={"/"}
    >
      <Music
        color="#064e3b"
        className="h-full w-auto rounded-l bg-zinc-800 p-1 shadow-equal-md"
      />

      <p className="truncate text-lg font-light">Album/Song</p>
    </Link>
  );
}
