"use client";

import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SongsByName = dynamic(() => import("@/components/search/SongsByName"));

const SongsByArtist = dynamic(() =>
  import("@/components/search/SongsByArtist"),
);

const AlbumsByName = dynamic(() => import("@/components/search/AlbumsByName"));

const AlbumsByArtist = dynamic(() =>
  import("@/components/search/AlbumsByArtist"),
);

export default function SearchContent({ searchWord }) {
  const [playlists, setPlaylists] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/playlists/user?skip=0&limit=100`,
      {
        cache: "no-store",
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${session.accessToken}`,
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        setPlaylists(data);
      });
  }, []);

  if (searchWord !== "") {
    return (
      <div className="p-6">
        <div className="border-b border-zinc-800 pb-2 pl-2 text-2xl font-semibold">
          Search results for "{searchWord}"
        </div>
        <div className="space-y-2">
          <p className="border-b border-zinc-800 py-2 pl-2 text-xl font-semibold">
            Songs
          </p>
          <div className="flex">
            <SongsByName searchWord={searchWord} playlists={playlists} />
            <SongsByArtist searchWord={searchWord} playlists={playlists} />
          </div>
          <p className="border-b border-zinc-800 py-2 pl-2 text-xl font-semibold">
            Albums
          </p>
          <div className="flex">
            <AlbumsByName searchWord={searchWord} playlists={playlists} />
            <AlbumsByArtist searchWord={searchWord} playlists={playlists} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center text-2xl">
      Start searching for your favorite music!
    </div>
  );
}
