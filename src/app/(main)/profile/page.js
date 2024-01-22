"use client";

import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListMusic, MoreHorizontal, UserX } from "lucide-react";
import Link from "next/link";
import Loading from "@/components/loading/Loading";
import { useEffect, useState } from "react";
import SongCard from "@/components/music/SongCard";
import StarredSongsBarChart from "@/components/profile/StarredSongsBarChart";
import StarredSongsLoudnessLineChart from "@/components/profile/StarredSongsLoudnessLineChart";
import StarredSongsDecadesPieChart from "@/components/profile/StarredSongsDecadesPieChart";
import StarredSongsKeysPieChart from "@/components/profile/StarredSongsKeysPieChart";

function MoreMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-zinc-800 bg-zinc-950/95 text-gray-50">
        <DropdownMenuItem className="focus:bg-zinc-800 focus:text-gray-50">
          <Link href={"/playlists"} className="flex h-full w-full gap-2">
            <ListMusic className="opacity-60" size={20} />
            <p>Go to playlists</p>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className=" bg-zinc-800 " />
        <DropdownMenuItem className="focus:bg-red-600 focus:text-gray-50">
          <button className="flex gap-2" onClick={signOut}>
            <UserX className="opacity-60" size={20} />
            <p>Sign out</p>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function UserProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [starred, setStarred] = useState([]);
  const { data: session } = useSession();
  const user = session.user;

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/starred`, {
      cache: "no-store",
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${session.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStarred(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    const averageValues = starred.reduce(
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
      <div className="grid h-full w-full overflow-y-auto">
        <div className="flex h-[40vh] items-center gap-10 border-b border-zinc-600 px-10 pt-10">
          <div className="z-0 h-40 w-40 rounded-full bg-blue-100"></div>
          <div className="flex flex-col gap-2">
            <p className="text-sm">Profile</p>
            <p className="text-6xl font-bold">{user?.name}</p>
            <MoreMenu />
          </div>
        </div>
        <div className="bg-zinc-900 bg-opacity-50 p-4">
          <div className="mt-10 flex h-[50vh] gap-5">
            <StarredSongsBarChart data={averageValues} />
            <StarredSongsLoudnessLineChart data={starred} />
          </div>
          <div className="mt-10 flex h-[50vh] gap-5">
            <StarredSongsDecadesPieChart data={starred} />
            <StarredSongsKeysPieChart data={starred} />
          </div>
        </div>
      </div>
    );
  }
}
