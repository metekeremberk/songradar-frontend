import { User } from "lucide-react";
import Link from "next/link";

export default function PerformerCard() {
  return (
    <Link
      className="flex w-60 flex-col items-start rounded bg-zinc-800 p-4 transition-colors hover:bg-zinc-700"
      href={"/"}
    >
      <User
        color="#064e3b"
        className={"h-auto w-full rounded-full bg-zinc-800  shadow-equal-md"}
      />
      <p className="truncate pt-2 text-lg font-light">Performer</p>
      <p className="truncate text-sm font-light opacity-50">Artist</p>
    </Link>
  );
}
