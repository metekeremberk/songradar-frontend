import { searchSongsByName } from "@/lib/search";

export default async function SongsByName({ searchWord }) {
  const songsByName = await searchSongsByName(searchWord);
  return (
    <div className="m-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <p className="pb-1 text-lg">Songs by name</p>
      {songsByName.map((song, i) => {
        const name = song.name;
        const artists = JSON.parse(song.artists.replace(/'/g, '"'));
        const year = song.year;
        return (
          <div
            key={i}
            className="grid grid-cols-7 items-center gap-1 border-t border-zinc-800 px-4 py-2 transition-colors hover:bg-zinc-800"
          >
            <div className="col-span-3 truncate">{name}</div>
            <div className="col-span-2 truncate text-sm font-light opacity-60">
              {artists.toString()}
            </div>
            <div className="truncate text-sm font-light opacity-60">{year}</div>
            <div></div>
          </div>
        );
      })}
    </div>
  );
}
