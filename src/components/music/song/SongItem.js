import { Minus, Star } from "lucide-react";
import DeleteButton from "../DeleteButton";

export default function SongItem({ song }) {
  return (
    <div className="relative grid w-full grid-cols-4 border-t border-zinc-700 p-4 transition-colors hover:bg-zinc-800">
      <p className="truncate px-2">{song.title}</p>
      <p className="truncate border-l border-zinc-700 px-2">{song.year}</p>
      <p className="truncate border-l border-zinc-700 px-2">{song.genre}</p>
      <p className="truncate border-l border-zinc-700 px-2">
        {song.performers}
      </p>
      <Star
        className={
          "absolute right-24 mt-4 cursor-pointer rounded-full hover:bg-zinc-700"
        }
        size={25}
        color="#f9fafb"
      />
      <Minus
        className={
          "absolute right-14 mt-4 cursor-pointer rounded-full hover:bg-zinc-700"
        }
        size={25}
        color="#f9fafb"
      />
      <DeleteButton
        className={
          "absolute right-3 mt-3 cursor-pointer rounded-full hover:bg-zinc-700"
        }
        item={song}
        name={"song"}
        size={25}
      />
    </div>
  );
}
