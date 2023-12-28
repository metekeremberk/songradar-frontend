import Link from "next/link";

export default function ArtistCard({
  music = { name: "Song/Album", artists: "['Artists']" },
  gradient = " bg-zinc-800 ",
}) {
  let artists = "Artists";
  try {
    artists = JSON.parse(music.artists.replace(/'/g, '"'));
  } catch (error) {
    console.log(error);
  }
  return (
    <Link
      className="flex min-w-[160px] basis-[12.5%] flex-col items-start rounded bg-zinc-800 p-2.5 transition-colors hover:bg-zinc-700"
      href={"/"}
    >
      <div
        className={"mb-3 aspect-square h-auto w-full rounded-full " + gradient}
      />
      <p className="line-clamp-1 text-lg font-light">{artists[0]}</p>
      <p className="line-clamp-1 opacity-60">Artist</p>
    </Link>
  );
}
