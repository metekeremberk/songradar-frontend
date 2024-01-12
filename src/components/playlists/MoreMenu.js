"use client";

import { MoreHorizontal, Pen, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
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
} from "../ui/alert-dialog";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function EditMenu({ id, token }) {
  const playlistId = id;
  return <DialogContent></DialogContent>;
}

function DeleteMenu({ id, token }) {
  const playlistId = id;
  const router = useRouter();

  function handleDelete() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/playlists/${playlistId}`, {
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
          This action cannot be undone. This will permanently delete your
          playlist.
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

export default function MoreMenu({ id }) {
  const playlistId = id;
  const { data: session } = useSession();
  return (
    <Dialog>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-zinc-800 bg-zinc-950/95 text-gray-50">
            <DropdownMenuItem className="focus:bg-zinc-800 focus:text-gray-50">
              <DialogTrigger className="flex gap-2">
                <Pen className="opacity-60" size={20} />
                <p>Edit name</p>
              </DialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-red-800 focus:text-gray-50">
              <AlertDialogTrigger className="flex gap-2">
                <Trash className="opacity-60" size={20} />
                <p>Delete playlist</p>
              </AlertDialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
          <DeleteMenu id={playlistId} token={session.accessToken} />
          <EditMenu id={playlistId} />
        </DropdownMenu>
      </AlertDialog>
    </Dialog>
  );
}
