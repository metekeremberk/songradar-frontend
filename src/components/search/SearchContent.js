"use client";

import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import Profiles from "./profiles/Profiles";

const SongsByName = dynamic(() =>
  import("@/components/search/songs/SongsByName"),
);

const SongsByArtist = dynamic(() =>
  import("@/components/search/songs/SongsByArtist"),
);

const AlbumsByName = dynamic(() =>
  import("@/components/search/albums/AlbumsByName"),
);

const AlbumsByArtist = dynamic(() =>
  import("@/components/search/albums/AlbumsByArtist"),
);

export default function SearchContent({ searchWord }) {
  const [playlists, setPlaylists] = useState([]);
  const [toggleValue, setToggleValue] = useState(null);
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

  return (
    <div className="p-6">
      <div className="border-b border-zinc-800 pb-2 pl-2 text-2xl font-semibold">
        Search results for "{searchWord}"
      </div>
      <ToggleGroup
        type="single"
        value={toggleValue}
        onValueChange={(value) => {
          if (value) {
            setToggleValue(value);
          } else {
            setToggleValue(null);
          }
        }}
      >
        <ToggleGroupItem value="songs_by_name">Songs by name</ToggleGroupItem>
        <ToggleGroupItem value="songs_by_artist">
          Songs by artist
        </ToggleGroupItem>
        <ToggleGroupItem value="albums_by_name">Albums by name</ToggleGroupItem>
        <ToggleGroupItem value="albums_by_artist">
          Albums by artist
        </ToggleGroupItem>
      </ToggleGroup>
      {!toggleValue && (
        <div className="space-y-2">
          <p className="border-b border-zinc-800 py-2 pl-2 text-xl font-semibold">
            Profiles
          </p>
          <div className="w-full">
            <Profiles searchWord={searchWord} />
          </div>
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
      )}
      {toggleValue === "songs_by_name" && (
        <SongsByName searchWord={searchWord} playlists={playlists} toggled />
      )}
      {toggleValue === "songs_by_artist" && (
        <SongsByArtist searchWord={searchWord} playlists={playlists} toggled />
      )}
      {toggleValue === "albums_by_artist" && (
        <AlbumsByArtist searchWord={searchWord} playlists={playlists} toggled />
      )}
      {toggleValue === "albums_by_name" && (
        <AlbumsByName searchWord={searchWord} playlists={playlists} toggled />
      )}
    </div>
  );
}
