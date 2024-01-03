import Link from "next/link";
import React from "react";

export default function Playlists() {
  return (
    <div className="h-full w-full overflow-hidden bg-zinc-950/70 p-4">
      <p className="border-b border-zinc-700 py-4 text-2xl">Playlists</p>
      <div className="space-y-1 overflow-auto py-2">
        <Link
          href={"/playlists/id"}
          className="flex gap-4 rounded p-2 transition-colors hover:bg-zinc-700"
        >
          <p className="grow">Playlist</p>
          <p className="basis-48">User</p>
          <p className="basis-48">Time</p>
        </Link>
        <Link
          href={"/playlists/id"}
          className="flex gap-4 rounded p-2 transition-colors hover:bg-zinc-700"
        >
          <p className="grow">Playlist</p>
          <p className="basis-48">User</p>
          <p className="basis-48">Time</p>
        </Link>
        <Link
          href={"/playlists/id"}
          className="flex gap-4 rounded p-2 transition-colors hover:bg-zinc-700"
        >
          <p className="grow">Playlist</p>
          <p className="basis-48">User</p>
          <p className="basis-48">Time</p>
        </Link>
      </div>
    </div>
  );
}
