import dynamic from "next/dynamic";

const SongsByName = dynamic(() => import("@/components/search/SongsByName"));

const SongsByArtist = dynamic(() =>
  import("@/components/search/SongsByArtist"),
);

const AlbumsByName = dynamic(() => import("@/components/search/AlbumsByName"));

const AlbumsByArtist = dynamic(() =>
  import("@/components/search/AlbumsByArtist"),
);

export default async function SearchContent({ searchWord }) {
  if (searchWord !== "") {
    return (
      <div className="h-full p-6">
        <div className="border-b border-zinc-800 pb-2 pl-2 text-2xl font-semibold">
          Search results for "{searchWord}"
        </div>
        <SongsByName searchWord={searchWord} />
        <SongsByArtist searchWord={searchWord} />
        <AlbumsByName searchWord={searchWord} />
        <AlbumsByArtist searchWord={searchWord} />
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="h-full w-full space-y-5 p-6">
        <p className="text-xl">Check out all</p>
        <div className="grid w-full grid-cols-6 gap-3">
          {Array.from({ length: 24 }, (_, index) => (
            <div
              key={index}
              className="flex aspect-square items-center justify-center rounded-xl bg-black"
            >
              <p>Div {index + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
