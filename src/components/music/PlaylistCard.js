import Link from "next/link";
import { getColorPairing } from "@/lib/colorPair";

export default function PlaylistsCard({
  music = [
    { name: "Song/Album", artists: "['Artists']" },
    { name: "Song/Album", artists: "['Artists']" },
    { name: "Song/Album", artists: "['Artists']" },
    { name: "Song/Album", artists: "['Artists']" },
  ],
}) {
  const gradient = [];
  for (let i = 0; i < music.length; i++) {
    const element = music[i];
    gradient.push(getColorPairing(element));
  }
  return (
    <Link
      className="flex min-w-[160px] basis-[12.5%] flex-col items-start rounded bg-zinc-800 p-2.5 transition-colors hover:bg-zinc-700"
      href={"/"}
    >
      <div
        className={"mb-3 grid aspect-square h-auto w-full grid-cols-2 rounded"}
      >
        {music.map((track, i) => {
          return (
            <div
              key={i}
              className={"aspect-square h-full w-full" + gradient[i]}
            />
          );
        })}
      </div>
      <p className="line-clamp-1 text-lg font-light">{music[0].name}</p>
      <p className="line-clamp-1 opacity-60">Playlist</p>
    </Link>
  );
}
