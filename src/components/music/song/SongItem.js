import { Ban, Heart } from "lucide-react";
import DeleteButton from "../DeleteButton";

export default function SongItem({ song, gradient }) {
  return (
    <div className="relative my-1 flex w-full items-center gap-2 rounded border-zinc-700 px-2 transition-colors hover:bg-zinc-800">
      <div className={"aspect-square w-6 " + gradient} />
      <p className="grow truncate px-2 py-2">{song.name}</p>
      <p className="basis-32 truncate px-2 py-2 opacity-60">{song.year}</p>
      <p className="basis-60 truncate px-2 py-2 opacity-60">
        {JSON.parse(song.artists.replace(/'/g, '"')).toString()}
      </p>
      <div className="flex items-center gap-3">
        <Heart
          className={"cursor-pointer rounded-full hover:bg-zinc-700"}
          size={25}
          color="#f9fafb"
        />
        <Ban
          className={"cursor-pointer rounded-full hover:bg-zinc-700"}
          size={25}
          color="#f9fafb"
        />
        <DeleteButton
          className={"cursor-pointer rounded-full hover:bg-zinc-700"}
          item={song}
          name={"song"}
          size={25}
        />
      </div>
    </div>
  );
}
