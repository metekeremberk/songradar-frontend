import { useState, useEffect } from "react";
import Loading from "../loading/Loading";
import PlaylistsCard from "../music/PlaylistCard";
import { useSession } from "next-auth/react";

export default function Playlists({ skip = 0 }) {
  const [isLoading, setIsLoading] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="flex justify-start gap-3 overflow-auto">
        {playlists.map((playlist, i) => {
          return <PlaylistsCard key={i} music={playlist} />;
        })}
      </div>
    );
  }
}
