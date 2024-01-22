import Link from "next/link";
import PlaylistItemMoreMenu from "./PlaylistItemMoreMenu";
import jsonFix from "@/lib/jsonfix";

export default function PlaylistItem({ song, allPlaylists, playlist }) {
  return (
    <Link
      href={"/song/" + song.id}
      className="relative my-1 flex w-full items-center gap-2 rounded border-zinc-700 px-2 transition-colors hover:bg-zinc-800"
    >
      <div className={"aspect-square w-6"} />
      <p className="grow truncate px-2 py-2">{song.name}</p>
      <p className="basis-32 truncate px-2 py-2 opacity-60">{song.year}</p>
      <p className="basis-60 truncate px-2 py-2 opacity-60">
        {JSON.parse(jsonFix(song.artists)).toString()}
      </p>
      <div className="flex items-center gap-3">
        <PlaylistItemMoreMenu
          track={song}
          allPlaylists={allPlaylists}
          playlist={playlist}
        />
      </div>
    </Link>
  );
}
