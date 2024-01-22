"use client";

import Loading from "@/components/loading/Loading";
import PlaylistsCard from "@/components/music/PlaylistCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Playlists() {
  const [isLoading, setIsLoading] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  function getPlaylists() {
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
  }

  useEffect(() => {
    setIsLoading(true);
    getPlaylists();
    setIsLoading(false);
  }, []);

  async function createPlaylist(formData) {
    const playlistName = formData.get("name");
    const data = {
      name: playlistName,
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/playlists/`, {
      cache: "no-store",
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${session.accessToken}`,
      },
      body: JSON.stringify(data),
    });

    router.refresh();
  }

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="h-full w-full overflow-hidden bg-zinc-950/70 p-4">
        <p className="border-b border-zinc-700 py-4 text-2xl">Playlists</p>
        <div className="grid grid-cols-5 gap-5 p-5">
          <Dialog>
            <DialogTrigger className="flex min-w-[160px] basis-[12.5%] flex-col items-center justify-center gap-3 rounded bg-zinc-800 transition-colors hover:bg-zinc-700">
              <p>Create Playlist</p>
              <Plus />
            </DialogTrigger>
            <DialogContent className="aspect-[4/3] w-[300px] border-zinc-700 bg-zinc-900 text-gray-50">
              <DialogHeader>
                <DialogTitle>Add new playlist</DialogTitle>
              </DialogHeader>
              <form
                className="flex flex-col items-center gap-5"
                action={createPlaylist}
              >
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="rounded bg-zinc-800 px-4 py-2"
                  placeholder="Playlist name"
                />
                <button
                  type="submit"
                  className="rounded border-zinc-700 bg-zinc-800 px-4 py-2 transition-colors hover:bg-zinc-700"
                >
                  Create
                </button>
              </form>
            </DialogContent>
          </Dialog>
          {playlists?.map((playlist, i) => {
            return <PlaylistsCard playlist={playlist} key={i} />;
          })}
        </div>
      </div>
    );
  }
}
