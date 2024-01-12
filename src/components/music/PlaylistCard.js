import Link from "next/link";

export default function PlaylistsCard({ music }) {
  return (
    <Link
      className="flex min-w-[160px] basis-[12.5%] flex-col items-start rounded bg-zinc-800 p-2.5 transition-colors hover:bg-zinc-700"
      href={"/playlists/" + music.id}
    >
      <div
        className={"mb-3 grid aspect-square h-auto w-full grid-cols-2 rounded"}
      ></div>
      <p className="line-clamp-1 text-lg font-light">{music.name}</p>
      <p className="line-clamp-1 opacity-60">Playlist</p>
    </Link>
  );
}
