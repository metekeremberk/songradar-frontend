"use client";

import Loading from "@/components/loading/Loading";
import MoreMenu from "@/components/playlists/MoreMenu";
import PlaylistItem from "@/components/playlists/PlaylistItem";
import StarredSongsBarChart from "@/components/profile/StarredSongsBarChart";
import { ArrowLeft, Dot } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PlaylistPage({ params }) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [playlist, setPlaylist] = useState({
    songs: [],
  });
  const [allPlaylists, setAllPlaylists] = useState([]);
  const router = useRouter();

  function getPlaylist() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/playlists/${params.id}`, {
      cache: "no-store",
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) setPlaylist(data);
      });
  }

  function getAllPlaylists() {
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
        if (data) setAllPlaylists(data);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    getPlaylist();
    getAllPlaylists();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    const averageValues = playlist.songs.reduce(
      (acc, song, _, { length }) => {
        acc.danceability += song.danceability / length;
        acc.energy += song.energy / length;
        acc.speechiness += song.speechiness / length;
        acc.acousticness += song.acousticness / length;
        acc.instrumentalness += song.instrumentalness / length;
        acc.liveness += song.liveness / length;
        acc.valence += song.valence / length;

        return acc;
      },
      {
        danceability: 0,
        energy: 0,
        speechiness: 0,
        acousticness: 0,
        instrumentalness: 0,
        liveness: 0,
        valence: 0,
      },
    );
    return (
      <div className="grid h-full w-full grid-cols-1 grid-rows-5 text-gray-50">
        <div className="row-span-2 flex w-full justify-between gap-4 p-4">
          <div className="flex grow justify-start gap-4 ">
            <div>
              <button
                className="rounded-full p-2 transition-colors hover:bg-zinc-800"
                onClick={() => {
                  router.back();
                }}
              >
                <ArrowLeft color="#f9fafb" size={30} />
              </button>
            </div>
            <div className="row-span-2 m-auto aspect-square w-48 flex-none rounded bg-zinc-800 p-1" />
            <div className="col-span-3 row-span-2 flex h-full grow flex-col items-start justify-center pt-20  font-light">
              <p className="text-2xl">{playlist?.name}</p>
              <div className="flex items-center gap-2">
                <p className="text-lg opacity-60">Playlist</p>
                <Dot className="opacity-60" />
                <p className="text-lg opacity-60">
                  {playlist?.songs?.length} songs
                </p>
                <Dot className="opacity-60" />
                <MoreMenu id={params.id} />
              </div>
            </div>
          </div>
          <StarredSongsBarChart data={averageValues} />
        </div>
        <div className="col-span-4 row-span-3 flex flex-col overflow-y-auto border-t border-zinc-700 p-5">
          {playlist?.songs?.map((song, i) => {
            return (
              <PlaylistItem
                song={song}
                key={i}
                allPlaylists={allPlaylists}
                playlist={playlist}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
