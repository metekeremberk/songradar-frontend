"use client";

import { Ban, Disc3, ListMusic, MoreHorizontal, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function PlaylistItemMoreMenu({
  track,
  allPlaylists,
  playlist,
}) {
  const { data: session } = useSession();

  let albumId;

  if (track.album_id !== undefined) {
    albumId = track.album_id;
  } else {
    albumId = track.id;
  }

  function handleAddToPlaylist(playlistId) {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/playlists/${playlistId}/${track.id}`,
      {
        cache: "no-store",
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${session.accessToken}`,
        },
      },
    );
  }

  function handleDeletePlaylist(songId) {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/playlists/${playlist.id}/${songId}`,
      {
        cache: "no-store",
        method: "DELETE",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${session.accessToken}`,
        },
      },
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-zinc-800 bg-zinc-950/95 text-gray-50">
        <DropdownMenuItem className="gap-2 focus:bg-zinc-800 focus:text-gray-50">
          <Star className="opacity-60" size={20} />
          <p>Add to liked songs</p>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="gap-2 focus:bg-zinc-800 focus:text-gray-50">
            <ListMusic className="opacity-60" size={20} />
            <p>Add to playlist</p>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="border-zinc-800 bg-zinc-950/95 text-gray-50">
              {allPlaylists?.map((playlist, i) => {
                return (
                  <DropdownMenuItem
                    className="focus:bg-zinc-800 focus:text-gray-50"
                    key={i}
                  >
                    <button
                      onClick={() => handleAddToPlaylist(playlist.id)}
                      className="flex h-full w-full"
                    >
                      {playlist.name}
                    </button>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator className=" bg-zinc-800 " />
        <DropdownMenuItem className="focus:bg-zinc-800 focus:text-gray-50">
          <button
            onClick={() => handleDeletePlaylist(track.id)}
            className="flex gap-2"
          >
            <Ban className="opacity-60" size={20} />
            <p>Remove from playlist</p>
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator className=" bg-zinc-800 " />
        <DropdownMenuItem className="focus:bg-zinc-800 focus:text-gray-50">
          <Link href={"/albums/" + albumId} className="flex gap-2">
            <Disc3 className="opacity-60" size={20} />
            <p>Go to album</p>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
