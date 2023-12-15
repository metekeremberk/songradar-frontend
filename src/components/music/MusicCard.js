import { Music } from "lucide-react";
import Link from "next/link";

export default function MusicCard() {
  return (
    <Link
      className="flex w-40 flex-col items-start rounded bg-zinc-800 p-2.5 transition-colors hover:bg-zinc-700"
      href={"/"}
    >
      <Music
        color="#064e3b"
        className={"h-auto w-full rounded bg-zinc-800  shadow-equal-md"}
      />
      <p className="truncate pt-2 text-lg font-light">Album/Song</p>
      <p className="truncate text-sm font-light opacity-50">Performers</p>
    </Link>
  );
}
