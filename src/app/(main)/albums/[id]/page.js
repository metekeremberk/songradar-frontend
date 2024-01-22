"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ArrowLeft, Dot } from "lucide-react";
import DeleteButton from "@/components/music/DeleteButton";
import AddSong from "@/components/music/song/AddSong";
import SongItem from "@/components/music/song/SongItem";
import Loading from "@/components/loading/Loading";
import AlbumMoreMenu from "@/components/music/album/AlbumMoreMenu";

export default function page({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [album, setAlbum] = useState([]);
  const [albumCoverUrl, setAlbumCoverUrl] = useState("");
  const [artists, setArtists] = useState("Artists");
  const [time, setTime] = useState(null);
  const [ownsAlbum, setOwnsAlbum] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
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
        setOwnsAlbum(session.user.id === data.owner_id);
        getImageUrl(data.id);
        try {
          setArtists(JSON.parse(music.artists.replace(/'/g, '"')));
        } catch (error) {
          console.log(error);
        }
        const date = new Date(data.duration_ms);
        const minutes = String(date.getMinutes());
        const seconds = String(date.getSeconds());
        setTime(minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
        setIsLoading(false);
      });

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
  }, []);

  function getImageUrl(id) {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/albums/cover/${id}`, {
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
          <div className="flex grow justify-start gap-4">
            {albumCoverUrl && (
              <Image
                src={`${albumCoverUrl}`}
                className="row-span-2 m-auto flex-none rounded p-1"
                width={192}
                height={192}
                alt="album_cover"
              />
            )}
            <div className="col-span-3 row-span-2 flex h-full grow flex-col items-start justify-center pt-20  font-light">
              <p className="text-2xl">{album?.name}</p>
              <div className="flex items-center gap-2">
                <p className="text-lg opacity-60">{artists}</p>
                {!ownsAlbum && (
                  <>
                    <Dot className="opacity-60" />
                    <p className="opacity-60">{time}</p>
                  </>
                )}
                {ownsAlbum && (
                  <>
                    <Dot className="opacity-60" />
                    <AlbumMoreMenu id={album?.id} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 row-span-3 flex flex-col overflow-y-auto border-t border-zinc-700 p-5">
          {album.tracks?.map((song, i) => {
            return <SongItem song={song} key={i} playlists={playlists} />;
          })}
        </div>
      </div>
    );
  }
}
