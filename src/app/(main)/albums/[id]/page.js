"use client";

import DeleteButton from "@/components/music/DeleteButton";
import AddSong from "@/components/music/song/AddSong";
import SongItem from "@/components/music/song/SongItem";
import { ArrowLeft, Dot } from "lucide-react";
import { useState, useEffect } from "react";
import Loading from "@/components/loading/Loading";
import { useRouter } from "next/navigation";
import { getColorPairing } from "@/lib/colorPair";

export default function page({ params }) {
  const [isLoading, setIsLoading] = useState(false);
  const [album, setAlbum] = useState([]);
  const [artists, setArtists] = useState("");
  const [time, setTime] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/albums/${params.id}`, {
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
        setArtists(JSON.parse(data.artists.replace(/'/g, '"')).toString());
        const date = new Date(data.duration_ms);
        const minutes = String(date.getMinutes());
        const seconds = String(date.getSeconds());
        setTime(minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className=" grid h-full w-full grid-cols-1 grid-rows-5 bg-zinc-950 text-gray-50">
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
            <div
              color="#064e3b"
              className={
                "row-span-2 m-auto aspect-square w-48 flex-none rounded p-1" +
                getColorPairing(album)
              }
            />
            <div className="col-span-3 row-span-2 flex h-full grow flex-col items-start justify-center pt-20  font-light">
              <p className="text-2xl">{album?.name}</p>
              <div className="flex items-center gap-2 opacity-60">
                <p className="text-lg">{artists}</p>
                <Dot />
                <p>{time}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <AddSong
                className="rounded-full p-2 transition-colors hover:bg-zinc-800"
                album={album}
              />
            </div>
            <div>
              <DeleteButton
                className={
                  "rounded-full p-2 transition-colors hover:bg-zinc-800"
                }
                item={album}
                name={"album"}
              />
            </div>
          </div>
        </div>
        <div className="col-span-4 row-span-3 flex flex-col overflow-y-auto border-t border-zinc-700 p-5">
          {album.tracks?.map((song, i) => {
            return (
              <SongItem song={song} key={i} gradient={getColorPairing(song)} />
            );
          })}
        </div>
      </div>
    );
  }
}
