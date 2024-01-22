"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
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
import { Disc3, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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

export default function AlbumCard({ album }) {
  const [isLoading, setIsLoading] = useState(true);
  const [albumCoverUrl, setAlbumCoverUrl] = useState("");
  const { data: session } = useSession();
  const ownsAlbum = session.user.id === album.owner_id;

  let artists = "Artists";
  try {
    artists = JSON.parse(album.artists.replace(/'/g, '"'));
  } catch (error) {
    console.log(error);
  }

  useEffect(() => {
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
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AlertDialog>
        <ContextMenu>
          <ContextMenuTrigger>
            <Link
              className="flex min-w-[160px] basis-[12.5%] flex-col items-start rounded bg-zinc-800 p-2.5 transition-colors hover:bg-zinc-700"
              href={"/albums/" + album.id}
            >
              <div className={"mb-3 aspect-square h-auto w-full rounded "}>
                {albumCoverUrl && (
                  <Image
                    src={albumCoverUrl}
                    alt="album_cover"
                    width={300}
                    height={300}
                  />
                )}
              </div>
              <p className="line-clamp-1 text-lg font-light">{album.name}</p>
              <p className="line-clamp-1 opacity-60">{artists.toString()}</p>
            </Link>
          </ContextMenuTrigger>
          <ContextMenuContent className="border-zinc-800 bg-zinc-900 text-gray-50">
            <ContextMenuItem className="transition-colors focus:bg-zinc-800 focus:text-gray-50">
              <Link href={"/albums/" + album.id} className="flex gap-2">
                <Disc3 className="opacity-60" size={20} />
                <p>Go to album</p>
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
