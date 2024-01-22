"use client";

import Loading from "@/components/loading/Loading";
import SongItem from "@/components/music/song/SongItem";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RadioPage({ params }) {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [album, setAlbum] = useState({});
  const [albumCoverUrl, setAlbumCoverUrl] = useState(null);
  const [playlists, setPlaylists] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  function getRecommendations() {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/recommend/album/${params.id}?recommend=30`,
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

  function getAlbum() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/albums/find/${params.id}`, {
      cache: "no-store",
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAlbum(data);
      });
  }

  function getImageUrl() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/albums/cover/${params.id}`, {
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
    getAlbum();
    getImageUrl();
    getPlaylists();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className=" grid h-full w-full grid-cols-1 grid-rows-5 text-gray-50">
        <div className="row-span-2 flex w-full justify-between gap-4 p-4">
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
          {albumCoverUrl && (
            <Image
              src={`${albumCoverUrl}`}
              className="row-span-2 m-auto flex-none rounded p-1"
              width={192}
              height={192}
              alt="album_cover"
            />
          )}
          <div className="flex grow justify-start gap-4">
            <div className="col-span-3 row-span-2 flex h-full grow flex-col items-start justify-center pt-20 font-light">
              <p className="text-2xl">"{album.name}" radio</p>
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
