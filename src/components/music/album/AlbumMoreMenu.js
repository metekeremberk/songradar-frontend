"use client";

import { MoreHorizontal, Plus, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function DeleteMenu({ id, token }) {
  const album_id = id;
  const router = useRouter();

  function handleDelete() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/albums/${album_id}`, {
      cache: "no-store",
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        router.push("/home");
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

export default function AlbumMoreMenu({ id }) {
  const album_id = id;
  const { data: session } = useSession();
  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-zinc-800 bg-zinc-950/95 text-gray-50">
          <DropdownMenuItem className="focus:bg-zinc-800 focus:text-gray-50">
            <Link
              className="flex h-full w-full gap-2"
              href={"/personal/add/songs"}
            >
              <Plus className="opacity-60" size={20} />
              <p>Add song</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-red-800 focus:text-gray-50">
            <AlertDialogTrigger className="flex h-full w-full gap-2">
              <Trash className="opacity-60" size={20} />
              <p>Delete album</p>
            </AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
        <DeleteMenu id={album_id} token={session.accessToken} />
      </DropdownMenu>
    </AlertDialog>
  );
}
