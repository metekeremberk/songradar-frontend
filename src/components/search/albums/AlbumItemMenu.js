"use client";

import { Disc3, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import Link from "next/link";

export default function AlbumItemMenu({ album }) {
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
