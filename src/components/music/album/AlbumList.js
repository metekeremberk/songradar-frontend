import AddAlbum from "./AddAlbum";
import Link from "next/link";

export default function AlbumList({ albums }) {
  return (
    <div className="grid w-full grid-cols-7 items-center gap-5 p-5">
      <AddAlbum
        className={
          "aspect-square w-[1/7] rounded border border-zinc-700 bg-zinc-800 text-gray-50"
        }
      />
      {albums.length === 0 && <p key={0}>There are no albums.</p>}
      {albums.length > 0 && (
        <>
          {albums?.map((album, i) => {
            return (
              <Link
                className={
                  "aspect-square w-[1/7] rounded border border-zinc-700 bg-zinc-800 text-gray-50"
                }
                key={i}
                href={"./albums/" + album.id}
              >
                <p>{album.title}</p>
              </Link>
            );
          })}
        </>
      )}
    </div>
  );
}
