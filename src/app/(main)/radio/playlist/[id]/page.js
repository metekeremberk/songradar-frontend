"use client";

import Loading from "@/components/loading/Loading";
import SongItem from "@/components/music/song/SongItem";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RadioPage({ params }) {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [playlist, setPlaylist] = useState({});
  const [playlists, setPlaylists] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  function getRecommendations() {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/recommend/playlist/${params.id}?recommend=30`,
      {
        cache: "no-store",
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        setRecommendedSongs(data);
      });
  }

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
        console.log(data);
        setPlaylist(data);
      });
  }

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
    getRecommendations();
    getPlaylist();
    getPlaylists();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className=" grid h-full w-full grid-cols-1 grid-rows-5 text-gray-50">
        <div className="row-span-2 flex w-full items-center justify-between gap-4 p-4">
          <div className="h-full flex-col justify-start">
            <button
              className="rounded-full p-2 transition-colors hover:bg-zinc-800"
              onClick={() => {
                router.back();
              }}
            >
              <ArrowLeft color="#f9fafb" size={30} />
            </button>
          </div>
          <div className="aspect-square h-48 max-h-[192px] w-48 rounded bg-zinc-800" />
          <div className="flex grow justify-start gap-4">
            <div className="col-span-3 row-span-2 flex h-full grow flex-col items-start justify-center pt-20 font-light">
              <p className="text-2xl">"{playlist.name}" radio</p>
            </div>
          </div>
        </div>
        <div className="col-span-4 row-span-3 flex flex-col overflow-y-auto border-t border-zinc-700 p-5">
          {recommendedSongs?.map((song, i) => {
            return <SongItem song={song} key={i} playlists={playlists} />;
          })}
        </div>
      </div>
    );
  }
}
