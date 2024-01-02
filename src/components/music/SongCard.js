export default function SongCard({
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
    <div className="flex h-16 items-center gap-5 rounded bg-zinc-800 transition-colors hover:bg-zinc-700">
      <div className={"h-16 w-16 min-w-[64px] rounded-l" + gradient} />

      <div className="p-2">
        <p className="line-clamp-1 text-lg font-light">{music.name}</p>
        <p className="line-clamp-1 opacity-60">{artists.toString()}</p>
      </div>
    </div>
  );
}
