"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import SongCard from "../music/SongCard";

export default function Recommendations() {
  const [isLoading, setIsLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const { data: session } = useSession();

  function getSongs() {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/recommend/starred?recommend=6`,
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
        setSongs(data);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    getSongs();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    <Loading />;
  } else {
    return (
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
        {songs.map((song, i) => {
          return <SongCard song={song} key={i} />;
        })}
      </div>
    );
  }
}
