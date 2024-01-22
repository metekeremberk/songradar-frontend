"use client";

import { Disc3, MoreHorizontal, Radio, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import Link from "next/link";

export default function AlbumItemMenu({ album, ownsAlbum }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-zinc-800 bg-zinc-950/95 text-gray-50">
        <DropdownMenuItem className="focus:bg-zinc-800 focus:text-gray-50">
          <Link href={"/albums/" + album.id} className="flex gap-2">
            <Disc3 className="opacity-60" size={20} />
            <p>Go to album</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-zinc-800 focus:text-gray-50">
          <Link href={"/radio/album/" + album.id} className="flex gap-2">
            <Radio className="opacity-60" size={20} />
            <p>Go to radio</p>
          </Link>
        </DropdownMenuItem>
        {ownsAlbum && (
          <>
            <DropdownMenuSeparator className=" bg-zinc-800 " />
            <DropdownMenuItem className="focus:bg-red-800 focus:text-gray-50">
              <AlertDialogTrigger className="flex h-full w-full gap-2">
                <Trash className="opacity-60" size={20} />
                <p>Delete album</p>
              </AlertDialogTrigger>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
