import Link from "next/link";
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
import { Disc3, Radio, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function DeleteMenu({ id, token }) {
  const router = useRouter();

  function handleDelete() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/playlist/${id}`, {
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

export default function PlaylistsCard({ playlist }) {
  const { data: session } = useSession();
  return (
    <AlertDialog>
      <ContextMenu>
        <ContextMenuTrigger>
          <Link
            className="flex min-w-[160px] basis-[12.5%] flex-col items-start rounded bg-zinc-800 p-2.5 transition-colors hover:bg-zinc-700"
            href={"/playlists/" + playlist.id}
          >
            <div
              className={
                "mb-3 grid aspect-square h-auto w-full grid-cols-2 rounded"
              }
            ></div>
            <p className="line-clamp-1 text-lg font-light">{playlist.name}</p>
            <p className="line-clamp-1 opacity-60">Playlist</p>
          </Link>
        </ContextMenuTrigger>
        <ContextMenuContent className="border-zinc-800 bg-zinc-900 text-gray-50">
          <ContextMenuItem className="focus:bg-zinc-800 focus:text-gray-50">
            <Link
              href={"/radio/playlist/" + playlist.id}
              className="flex gap-2"
            >
              <Radio className="opacity-60" size={20} />
              <p>Go to radio</p>
            </Link>
          </ContextMenuItem>
          <ContextMenuSeparator className=" bg-zinc-800 " />
          <ContextMenuItem className="focus:bg-red-800 focus:text-gray-50">
            <AlertDialogTrigger className="flex h-full w-full gap-2">
              <Trash className="opacity-60" size={20} />
              <p>Delete playlist</p>
            </AlertDialogTrigger>
          </ContextMenuItem>
        </ContextMenuContent>
        <DeleteMenu id={playlist.id} token={session.accessToken} />
      </ContextMenu>
    </AlertDialog>
  );
}
