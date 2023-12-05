import Link from "next/link";
import MusicSVG from "@/components/svg/MusicSVG";

export default function page() {
  return (
    <main className="grid h-full w-full grid-cols-2 gap-4 bg-zinc-950 p-4">
      <Link
        href={"/music/albums"}
        className="relative z-0 flex items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 bg-left-bottom p-4 text-gray-100 transition-all duration-300 hover:scale-[101%] hover:bg-zinc-950 hover:shadow-equal-lg hover:shadow-zinc-900/30"
      >
        <MusicSVG
          className={
            "absolute bottom-0 right-0 -z-10 translate-x-1/4 translate-y-1/4 opacity-25"
          }
          color="#064e3b"
          size={600}
        />
        <div className="grid h-full w-full grid-rows-12">
          <p className="row-span-1 flex w-full items-center border-b border-zinc-800">
            Albums
          </p>
          <div className="row-span-11 w-full"></div>
        </div>
      </Link>
      <Link
        href={"/music/"}
        className="relative z-0 flex items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 bg-left-bottom p-4 text-gray-100 transition-all duration-300 hover:scale-[101%] hover:bg-zinc-950 hover:shadow-equal-lg hover:shadow-zinc-900/30"
      >
        <MusicSVG
          className={
            "absolute bottom-0 right-0 -z-10 translate-x-1/4 translate-y-1/4 opacity-25"
          }
          color="#064e3b"
          size={600}
        />
        <div className="grid h-full w-full grid-rows-12">
          <p className="row-span-1 flex w-full items-center border-b border-zinc-800">
            Songs
          </p>
          <div className="row-span-11 w-full"></div>
        </div>
      </Link>
    </main>
  );
}
