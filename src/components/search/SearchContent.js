import dynamic from "next/dynamic";

const SongsByName = dynamic(() => import("@/components/search/SongsByName"));

const SongsByArtist = dynamic(() =>
  import("@/components/search/SongsByArtist"),
);

const AlbumsByName = dynamic(() => import("@/components/search/AlbumsByName"));

const AlbumsByArtist = dynamic(() =>
  import("@/components/search/AlbumsByArtist"),
);

export default function SearchContent({ searchWord }) {
  if (searchWord !== "") {
    return (
      <div className="p-6">
        <div className="border-b border-zinc-800 pb-2 pl-2 text-2xl font-semibold">
          Search results for "{searchWord}"
        </div>
        <div className="space-y-2">
          <p className="border-b border-zinc-800 py-2 pl-2 text-xl font-semibold">
            Songs
          </p>
          <div className="flex">
            <SongsByName searchWord={searchWord} />
            <SongsByArtist searchWord={searchWord} />
          </div>
          <p className="border-b border-zinc-800 py-2 pl-2 text-xl font-semibold">
            Albums
          </p>
          <div className="flex">
            <AlbumsByName searchWord={searchWord} />
            <AlbumsByArtist searchWord={searchWord} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center text-2xl">
      Start searching for your favorite music!
    </div>
  );
}
