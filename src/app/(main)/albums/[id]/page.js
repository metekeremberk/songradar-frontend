import Link from "next/link";

import DeleteButton from "@/components/music/DeleteButton";
import AddSong from "@/components/music/song/AddSong";
import SongItem from "@/components/music/song/SongItem";
import { ArrowLeft, Music } from "lucide-react";

async function getAlbums() {
  const response = await fetch(
    `${process.env.NEXT_DB_URL}/debug/albums?skip=0&limit=100`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  return await response.json();
}

export default async function page({ params }) {
  const albums = await getAlbums();

  const album = albums.find((item) => item.id === Number(params.id));
  return (
    <div className="relative grid h-full w-full grid-cols-4 grid-rows-5 bg-zinc-950 text-gray-50">
      <Link
        className="absolute left-5 top-5 rounded-full p-2 transition-colors hover:bg-zinc-800"
        href={"./"}
      >
        <ArrowLeft color="#f9fafb" size={30} />
      </Link>
      <AddSong
        className="absolute right-20 top-5 rounded-full p-2 transition-colors hover:bg-zinc-800"
        album={album}
      />
      <DeleteButton
        className={
          "absolute right-5 top-5 rounded-full p-2 transition-colors hover:bg-zinc-800"
        }
        item={album}
        name={"album"}
      />
      <Music
        color="#064e3b"
        size={200}
        className={
          "row-span-2 m-auto rounded border border-zinc-700 bg-zinc-800 p-1"
        }
      />
      <div className="col-span-3 row-span-2 flex h-full items-end pb-24 text-2xl font-light">
        {album?.title}
      </div>
      <div className="col-span-4 row-span-3 flex flex-col overflow-y-auto border-t border-zinc-700 p-5">
        {album?.songs.map((song, i) => {
          return <SongItem song={song} key={i} />;
        })}
      </div>
    </div>
  );
}
