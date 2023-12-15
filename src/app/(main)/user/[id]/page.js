import PerformerCard from "@/components/music/PerformerCard";
import MusicButton from "@/components/music/MusicButton";
import Link from "next/link";
import MusicCard from "@/components/music/MusicCard";

async function getUserById(id) {
  const response = await fetch(`${process.env.NEXT_DB_URL}/debug/users/${id}`, {
    cache: "no-store",
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    const user = await response.json();
    return user;
  }
}

export default async function UserProfile({ params }) {
  const user = await getUserById(params.id);

  return (
    <div className=" w-full overflow-y-auto">
      <div className="flex h-[50vh] items-center gap-10 border-b border-zinc-600 px-10 pt-10">
        <div className="z-0 h-60 w-60 rounded-full bg-blue-100"></div>
        <div className="flex flex-col gap-2">
          <p className="text-sm">Profile</p>
          <p className="text-6xl font-bold">{user.username}</p>
        </div>
      </div>
      <div className="space-y-5 bg-zinc-900 bg-opacity-50 p-10">
        <div className="flex w-full flex-col gap-3 border-b border-zinc-700 pb-4">
          <div className="flex justify-between">
            <p className="text-xl">Favorite performers</p>
            <Link
              href={"/performers"}
              className="text-gray-400 hover:underline"
            >
              See all
            </Link>
          </div>
          <div className="flex justify-start gap-3 overflow-x-auto">
            <PerformerCard />
            <PerformerCard />
            <PerformerCard />
            <PerformerCard />
            <PerformerCard />
            <PerformerCard />
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 border-b border-zinc-700 pb-4">
          <div className="flex justify-between">
            <p className="text-xl">Favorite songs</p>
            <Link
              href={"/recommendations"}
              className="text-gray-400 hover:underline"
            >
              See all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
            <MusicButton />
            <MusicButton />
            <MusicButton />
            <MusicButton />
            <MusicButton />
            <MusicButton />
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 border-b border-zinc-700 pb-4">
          <div className="flex justify-between">
            <p className="text-xl">Playlists</p>
            <Link href={"/playlists"} className="text-gray-400 hover:underline">
              See all
            </Link>
          </div>
          <div className="flex justify-start gap-3 overflow-x-auto">
            <MusicCard />
            <MusicCard />
            <MusicCard />
            <MusicCard />
            <MusicCard />
            <MusicCard />
          </div>
        </div>
      </div>
    </div>
  );
}
