import { searchAlbumsByName } from "@/lib/search";
import Link from "next/link";

export default async function AlbumsByName({ searchWord }) {
  const albumsByName = await searchAlbumsByName(searchWord);
  return (
    <div className="m-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <p className="pb-1 text-lg">Albums by name</p>
      {albumsByName.map((album, i) => {
        const name = album.name;
        const artists = JSON.parse(album.artists.replace(/'/g, '"'));
        const year = album.year;
        return (
          <Link
            href={`/albums/${album.id}`}
            key={i}
            className="grid grid-cols-7 items-center gap-1 border-t border-zinc-800 px-4 py-2 transition-colors hover:bg-zinc-800"
          >
            <div className="col-span-3 truncate">{name}</div>
            <div className="col-span-2 truncate text-sm font-light opacity-60">
              {artists.toString()}
            </div>
            <div className="truncate text-sm font-light opacity-60">{year}</div>
            <div></div>
          </Link>
        );
      })}
    </div>
  );
}
