"use client";

import { useSession } from "next-auth/react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
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
import { Disc3, Radio, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/components/loading/Loading";
import { useRouter } from "next/navigation";
import jsonFix from "@/lib/jsonfix";
import Link from "next/link";
import AlbumItemMenu from "./AlbumItemMenu";

function DeleteMenu({ id, token }) {
  const router = useRouter();

  function handleDelete() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/albums/${id}`, {
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
          This action cannot be undone. This will permanently delete your album.
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

export default function Album({ album, playlists }) {
  const [isLoading, setIsLoading] = useState(true);
  const [albumCoverUrl, setAlbumCoverUrl] = useState("");
  const { data: session } = useSession();
  const ownsAlbum = album.owner_id === session.user.id;

  let artists = "Artists";
  try {
    artists = JSON.parse(jsonFix(album.artists));
  } catch (error) {
    console.log(error);
  }

  function getImageUrl() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/albums/cover/${album.id}`, {
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
          setAlbumCoverUrl(null);
        } else {
          setAlbumCoverUrl(data);
        }
      });
  }

  useEffect(() => {
    setIsLoading(true);
    getImageUrl();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AlertDialog>
        <ContextMenu>
          <ContextMenuTrigger>
            <Link
              href={"/albums/" + album.id}
              className="relative my-1 grid w-full grid-cols-8 items-center gap-2 rounded border-zinc-700 px-2 py-1 transition-colors hover:bg-zinc-800"
            >
              <div className={"aspect-square w-8"}>
                {albumCoverUrl && (
                  <Image
                    src={albumCoverUrl}
                    alt="song_cover"
                    width={150}
                    height={150}
                  />
                )}
              </div>
              <p className="col-span-3 truncate px-2 py-2">{album.name}</p>
              <p className="truncate px-2 py-2 opacity-60">{album.year}</p>
              <p className="col-span-2 truncate px-2 py-2 opacity-60">
                {artists.toString()}
              </p>
              <div className="flex items-center gap-3">
                <AlbumItemMenu
                  album={album}
                  playlists={playlists}
                  ownsAlbum={ownsAlbum}
                />
              </div>
            </Link>
          </ContextMenuTrigger>
          <ContextMenuContent className="border-zinc-800 bg-zinc-900 text-gray-50">
            <ContextMenuItem className="focus:bg-zinc-800 focus:text-gray-50">
              <Link href={"/albums/" + album.id} className="flex gap-2">
                <Disc3 className="opacity-60" size={20} />
                <p>Go to album</p>
              </Link>
            </ContextMenuItem>
            <ContextMenuItem className="focus:bg-zinc-800 focus:text-gray-50">
              <Link href={"/radio/album/" + album.id} className="flex gap-2">
                <Radio className="opacity-60" size={20} />
                <p>Go to radio</p>
              </Link>
            </ContextMenuItem>
            {ownsAlbum && (
              <>
                <ContextMenuSeparator className=" bg-zinc-800 " />
                <ContextMenuItem className="focus:bg-red-800 focus:text-gray-50">
                  <AlertDialogTrigger className="flex h-full w-full gap-2">
                    <Trash className="opacity-60" size={20} />
                    <p>Delete album</p>
                  </AlertDialogTrigger>
                </ContextMenuItem>
              </>
            )}
          </ContextMenuContent>
          <DeleteMenu id={album.id} token={session.accessToken} />
        </ContextMenu>
      </AlertDialog>
    );
  }
}
