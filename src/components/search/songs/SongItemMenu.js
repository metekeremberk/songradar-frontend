"use client";

import {
  Disc3,
  ListMusic,
  MoreHorizontal,
  Radio,
  Star,
  StarOff,
} from "lucide-react";
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
} from "../../ui/dropdown-menu";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SongItemMenu({ track, playlists }) {
  const [isStarred, setIsStarred] = useState(false);
  const { data: session } = useSession();

  let albumId = track.album_id;

  function checkIsStarred() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/starred/${track.id}`, {
      cache: "no-store",
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${session.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setIsStarred(data));
  }

  useEffect(() => {
    checkIsStarred();
  }, []);

  function handleStarSong() {
    if (!isStarred) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/starred/${track.id}`, {
        cache: "no-store",
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${session.accessToken}`,
        },
      });
      setIsStarred(true);
    } else {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/starred/${track.id}`, {
        cache: "no-store",
        method: "DELETE",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${session.accessToken}`,
        },
      });
      setIsStarred(false);
    }
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-zinc-800 bg-zinc-950/95 text-gray-50">
        <DropdownMenuItem className="focus:bg-zinc-800 focus:text-gray-50">
          <button className="flex h-full w-full gap-2" onClick={handleStarSong}>
            {!isStarred && <Star className="opacity-60" size={20} />}
            {isStarred && <StarOff className="opacity-60" size={20} />}
            <p>
              {!isStarred && "Add to"} {isStarred && "Remove from"} liked songs
            </p>
          </button>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="gap-2 focus:bg-zinc-800 focus:text-gray-50">
            <ListMusic className="opacity-60" size={20} />
            <p>Add to playlist</p>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="border-zinc-800 bg-zinc-950/95 text-gray-50">
              {playlists?.map((playlist, i) => {
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
          <Link href={"/albums/" + albumId} className="flex gap-2">
            <Disc3 className="opacity-60" size={20} />
            <p>Go to album</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-zinc-800 focus:text-gray-50">
          <Link href={"/radio/" + track.id} className="flex gap-2">
            <Radio className="opacity-60" size={20} />
            <p>Go to radio</p>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
