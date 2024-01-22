"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "../loading/Loading";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuPortal,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../ui/context-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Disc3, ListMusic, Radio, Star, StarOff, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function DeleteMenu({ id, token }) {
  const router = useRouter();

  function handleDelete() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/songs/${id}`, {
      cache: "no-store",
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        router.refresh();
      }
    });
  }

  return (
    <AlertDialogContent className="border-zinc-700 bg-zinc-900">
      <AlertDialogHeader>
        <AlertDialogTitle className="text-gray-50">
          Are you absolutely sure?
        </AlertDialogTitle>
        <AlertDialogDescription className="text-gray-100/60">
          This action cannot be undone. This will permanently delete your song.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          className="bg-red-600 hover:bg-red-700"
          onClick={handleDelete}
        >
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

export default function SongCard({ song }) {
  const [isLoading, setIsLoading] = useState(true);
  const [songCoverUrl, setSongCoverUrl] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [isStarred, setIsStarred] = useState(false);
  const { data: session } = useSession();
  const ownsSong = song.owner_id === session.user.id;

  let artists = "Artists";
  try {
    artists = JSON.parse(song.artists.replace(/'/g, '"'));
  } catch (error) {
    console.log(error);
  }

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/songs/cover/${song?.id}`, {
      cache: "no-store",
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === "Not found") {
          setSongCoverUrl(null);
        } else {
          setSongCoverUrl(data);
        }
        setIsLoading(false);
      });

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

  function checkIsStarred() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/starred/${song.id}`, {
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
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/starred/${song.id}`, {
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
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/starred/${song.id}`, {
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
      `${process.env.NEXT_PUBLIC_API_URL}/api/playlists/${playlistId}/${song.id}`,
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

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AlertDialog>
        <ContextMenu>
          <ContextMenuTrigger>
            <Link
              href={"/songs/" + song.id}
              className="flex h-16 items-center gap-5 rounded bg-zinc-800 transition-colors hover:bg-zinc-700"
            >
              <div className={"h-16 w-16 min-w-[64px] rounded-l"}>
                {songCoverUrl && (
                  <Image
                    src={songCoverUrl}
                    alt="song_cover"
                    width={300}
                    height={300}
                    className="rounded-l"
                  />
                )}
              </div>
              <div className="p-2">
                <p className="line-clamp-1 text-lg font-light">{song?.name}</p>
                <p className="line-clamp-1 opacity-60">{artists.toString()}</p>
              </div>
            </Link>
          </ContextMenuTrigger>
          <ContextMenuContent className="border-zinc-800 bg-zinc-900 text-gray-50">
            <ContextMenuItem className="gap-2 focus:bg-zinc-800 focus:text-gray-50">
              <button
                className="flex h-full w-full gap-2"
                onClick={handleStarSong}
              >
                {!isStarred && <Star className="opacity-60" size={20} />}
                {isStarred && <StarOff className="opacity-60" size={20} />}
                <p>
                  {!isStarred && "Add to"} {isStarred && "Remove from"} liked
                  songs
                </p>
              </button>
            </ContextMenuItem>
            <ContextMenuSub>
              <ContextMenuSubTrigger className="gap-2 focus:bg-zinc-800 focus:text-gray-50">
                <ListMusic className="opacity-60" size={20} />
                <p>Add to playlist</p>
              </ContextMenuSubTrigger>
              <ContextMenuPortal>
                <ContextMenuSubContent className="border-zinc-800 bg-zinc-950/95 text-gray-50">
                  {playlists?.map((playlist, i) => {
                    return (
                      <ContextMenuItem
                        className="focus:bg-zinc-800 focus:text-gray-50"
                        key={i}
                      >
                        <button
                          onClick={() => handleAddToPlaylist(playlist.id)}
                          className="flex h-full w-full"
                        >
                          {playlist.name}
                        </button>
                      </ContextMenuItem>
                    );
                  })}
                </ContextMenuSubContent>
              </ContextMenuPortal>
            </ContextMenuSub>
            <ContextMenuSeparator className=" bg-zinc-800 " />
            <ContextMenuItem className="focus:bg-zinc-800 focus:text-gray-50">
              <Link href={"/albums/" + song.album_id} className="flex gap-2">
                <Disc3 className="opacity-60" size={20} />
                <p>Go to album</p>
              </Link>
            </ContextMenuItem>
            <ContextMenuItem className="focus:bg-zinc-800 focus:text-gray-50">
              <Link href={"/radio/" + song.id} className="flex gap-2">
                <Radio className="opacity-60" size={20} />
                <p>Go to radio</p>
              </Link>
            </ContextMenuItem>
            {ownsSong && (
              <>
                <ContextMenuSeparator className=" bg-zinc-800 " />
                <ContextMenuItem className="focus:bg-red-800 focus:text-gray-50">
                  <AlertDialogTrigger className="flex h-full w-full gap-2">
                    <Trash className="opacity-60" size={20} />
                    <p>Delete song</p>
                  </AlertDialogTrigger>
                </ContextMenuItem>
              </>
            )}
          </ContextMenuContent>
          <DeleteMenu id={song.id} token={session.accessToken} />
        </ContextMenu>
      </AlertDialog>
    );
  }
}
