import { Disc3, Heart, ListMusic, MoreHorizontal, User } from "lucide-react";
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

export default function ItemMenu({ track }) {
  let albumId;

  if (track.album_id !== undefined) {
    albumId = track.album_id;
  } else {
    albumId = track.id;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-zinc-800 bg-zinc-950/95 text-gray-50">
        <DropdownMenuItem className="gap-2 focus:bg-zinc-800 focus:text-gray-50">
          <Heart className="opacity-60" size={20} />
          <p>Add to liked songs</p>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="gap-2 focus:bg-zinc-800 focus:text-gray-50">
            <ListMusic className="opacity-60" size={20} />
            <p>Add to playlist</p>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="border-zinc-800 bg-zinc-950/95 text-gray-50">
              <DropdownMenuItem className="focus:bg-zinc-800 focus:text-gray-50">
                Playlist
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator className=" bg-zinc-800 " />
        <DropdownMenuItem className="gap-2 focus:bg-zinc-800 focus:text-gray-50">
          <User className="opacity-60" size={20} />
          <p>Go to artist</p>
        </DropdownMenuItem>
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
