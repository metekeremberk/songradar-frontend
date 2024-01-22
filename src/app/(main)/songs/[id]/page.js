"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ArrowLeft, Dot } from "lucide-react";
import Loading from "@/components/loading/Loading";
import SongItemMenu from "@/components/search/songs/SongItemMenu";
import SongDetailsBarChart from "@/components/music/song/SongDetailsBarChart";
import jsonFix from "@/lib/jsonfix";

export default function page({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [song, setSong] = useState({});
  const [songCoverUrl, setSongCoverUrl] = useState("");
  const [artists, setArtists] = useState("Artists");
  const [time, setTime] = useState(null);
  const [ownsSong, setOwnsSong] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [songChartData, setSongChartData] = useState({});
  const { data: session } = useSession();
  const router = useRouter();

  function getSong() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/songs/find/${params.id}`, {
      cache: "no-store",
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSong(data);
        setOwnsSong(session.user.id === data.owner_id);
        getImageUrl();
        try {
          setArtists(JSON.parse(jsonFix(data.artists)));
        } catch (error) {
          console.log(error);
        }
        const date = new Date(data.duration_ms);
        const minutes = String(date.getMinutes());
        const seconds = String(date.getSeconds());
        setTime(minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
        setSongChartData({
          danceability: data.danceability,
          energy: data.energy,
          speechiness: data.speechiness,
          acousticness: data.acousticness,
          instrumentalness: data.instrumentalness,
          liveness: data.liveness,
          valence: data.valence,
        });
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

  function getImageUrl() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/songs/cover/${params.id}`, {
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
          setSongCoverUrl(null);
        } else {
          setSongCoverUrl(data);
        }
      });
  }

  useEffect(() => {
    setIsLoading(true);
    getSong();
    getPlaylists();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="grid h-full w-full grid-cols-1 grid-rows-5 text-gray-50">
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
            {songCoverUrl && (
              <Image
                src={`${songCoverUrl}`}
                className="row-span-2 m-auto flex-none rounded p-1"
                width={192}
                height={192}
                alt="album_cover"
              />
            )}
            <div className="col-span-3 row-span-2 flex h-full grow flex-col items-start justify-center pt-20  font-light">
              <p className="text-2xl">{song?.name}</p>
              <div className="flex items-center gap-2">
                <p className="text-lg opacity-60">{artists}</p>
                {!ownsSong && (
                  <>
                    <Dot className="opacity-60" />
                    <p className="opacity-60">{time}</p>
                  </>
                )}
                <>
                  <Dot className="opacity-60" />
                  <SongItemMenu track={song} playlists={playlists} />
                </>
              </div>
            </div>
          </div>
        </div>
        <div className="row-span-3 p-10">
          <SongDetailsBarChart data={songChartData} />
        </div>
      </div>
    );
  }
}
