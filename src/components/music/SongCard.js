import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import Image from "next/image";

export default function SongCard({ music }) {
  const [isLoading, setIsLoading] = useState(true);
  const [songCoverUrl, setSongCoverUrl] = useState("");

  let artists = "Artists";
  try {
    artists = JSON.parse(music.artists.replace(/'/g, '"'));
  } catch (error) {
    console.log(error);
  }

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/songs/cover/${music?.id}`, {
      cache: "no-store",
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSongCoverUrl(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="flex h-16 items-center gap-5 rounded bg-zinc-800 transition-colors hover:bg-zinc-700">
        <div className={"h-16 w-16 min-w-[64px] rounded-l"}>
          <Image src={songCoverUrl} alt="song_cover" width={300} height={300} />
        </div>

        <div className="p-2">
          <p className="line-clamp-1 text-lg font-light">{music.name}</p>
          <p className="line-clamp-1 opacity-60">{artists.toString()}</p>
        </div>
      </div>
    );
  }
}
