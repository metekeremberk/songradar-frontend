"use client";

import Link from "next/link";
import SettingsSVG from "@/components/svg/SettingsSVG";
import UserSVG from "@/components/svg/UserSVG";
import StarSVG from "@/components/svg/StarSVG";
import MusicSVG from "@/components/svg/MusicSVG";
import FolderSVG from "@/components/svg/FolderSVG";
import LikeSVG from "@/components/svg/LikeSVG";
import { useContext } from "react";
import { albumContext } from "@/context/albumContext";
import { songContext } from "@/context/songContext";

export default function Home() {
  const { albums } = useContext(albumContext);
  const { songs } = useContext(songContext);

  return (
    <main className="h-full w-full bg-zinc-950 p-4">
      <div className="grid h-full w-full grid-cols-3 gap-4">
        <Link
          href={"/music/albums"}
          className="relative z-0 flex items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 bg-left-bottom p-4 text-gray-100 transition-all duration-300 hover:scale-[101%] hover:bg-zinc-950 hover:shadow-equal-lg hover:shadow-zinc-900/40"
        >
          <MusicSVG
            className={
              "absolute bottom-0 right-0 -z-10 translate-x-1/4 translate-y-1/4 opacity-25"
            }
            color="#064e3b"
            size={350}
          />
          <div className="grid h-full w-full grid-rows-6">
            <p className="row-span-1 flex w-full items-center border-b border-zinc-800">
              Albums
            </p>
            <div className="row-span-5 grid w-full grid-cols-1 items-center">
              {albums?.slice(0, 5).map((album, i) => {
                return (
                  <div
                    key={i}
                    className="mx-4 grid grid-cols-5 border-b border-zinc-800 py-1"
                  >
                    {" "}
                    <MusicSVG
                      color="#064e3b"
                      size={25}
                      className={"col-span-1 mx-auto"}
                    />
                    <p className="col-span-2 border-zinc-800 px-2 text-gray-300">
                      {album.title}
                    </p>
                    <p className="col-span-2 border-zinc-800 px-2 text-right text-gray-300">
                      {album.genre}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Link>
        <Link
          href={"/music/songs"}
          className="relative z-0 flex items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 bg-left-bottom p-4 text-gray-100 transition-all duration-300 hover:scale-[101%] hover:bg-zinc-950 hover:shadow-equal-lg hover:shadow-zinc-900/40"
        >
          <MusicSVG
            className={
              "absolute bottom-0 right-0 -z-10 translate-x-1/4 translate-y-1/4 opacity-25"
            }
            color="#064e3b"
            size={350}
          />
          <div className="grid h-full w-full grid-rows-6">
            <p className="row-span-1 flex w-full items-center border-b border-zinc-800">
              Songs
            </p>
            <div className="row-span-5 grid w-full grid-cols-1 items-center">
              {songs?.slice(0, 5).map((song, i) => {
                return (
                  <div
                    key={i}
                    className="mx-4 grid grid-cols-5 border-b border-zinc-800 py-1"
                  >
                    {" "}
                    <MusicSVG
                      color="#064e3b"
                      size={25}
                      className={"col-span-1 mx-auto"}
                    />
                    <p className="col-span-2 border-zinc-800 px-2 text-gray-300">
                      {song.title}
                    </p>
                    <p className="col-span-2 border-zinc-800 px-2 text-right text-gray-300">
                      {song.genre}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Link>
        <Link
          href={"/"}
          className="relative z-0 row-span-2 flex items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 bg-left-bottom p-4 text-gray-100 transition-all duration-300 hover:scale-[101%] hover:bg-zinc-950 hover:shadow-equal-lg hover:shadow-zinc-900/40"
        >
          <FolderSVG
            className={
              "absolute bottom-0 right-0 -z-10 translate-x-1/4 translate-y-1/3 opacity-25"
            }
            color="#064e3b"
            size={400}
          />
          <div className="grid h-full w-full grid-rows-12">
            <p className="row-span-1 flex w-full items-center border-b border-zinc-800">
              Playlists
            </p>
            <div className="row-span-11 w-full"></div>
          </div>
        </Link>
        <Link
          href={"/"}
          className="relative z-0 col-span-2 flex items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 bg-left-bottom p-4 text-gray-100 transition-all duration-300 hover:scale-[101%] hover:bg-zinc-950 hover:shadow-equal-lg hover:shadow-zinc-900/40"
        >
          <LikeSVG
            className={
              "absolute bottom-0 right-0 -z-10 translate-x-1/4 translate-y-1/3 opacity-25"
            }
            color="#064e3b"
            size={400}
          />
          <div className="grid h-full w-full grid-rows-6">
            <p className="row-span-1 flex w-full items-center border-b border-zinc-800">
              Recommendations
            </p>
            <div className="row-span-5 w-full"></div>
          </div>
        </Link>
        <Link
          href={"/"}
          className="relative z-0 flex items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 bg-left-bottom p-4 text-gray-100 transition-all duration-300 hover:scale-[101%] hover:bg-zinc-950 hover:shadow-equal-lg hover:shadow-zinc-900/40"
        >
          <UserSVG
            className={
              "absolute bottom-0 right-0 -z-10 translate-x-1/3 translate-y-1/3 opacity-25"
            }
            color="#064e3b"
            size={400}
          />
          <div className="grid h-full w-full grid-rows-6">
            <p className="row-span-1 flex w-full items-center border-b border-zinc-800">
              Friends
            </p>
            <div className="row-span-5 w-full"></div>
          </div>
        </Link>
        <Link
          href={"/"}
          className="relative z-0 flex items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 bg-left-bottom p-4 text-gray-100 transition-all duration-300 hover:scale-[101%] hover:bg-zinc-950 hover:shadow-equal-lg hover:shadow-zinc-900/40"
        >
          <StarSVG
            className={
              "absolute bottom-0 right-0 -z-10 translate-x-1/3 translate-y-1/3 opacity-25"
            }
            color="#064e3b"
            size={500}
          />
          <div className="grid h-full w-full grid-rows-6">
            <p className="row-span-1 flex w-full items-center border-b border-zinc-800">
              Favorites
            </p>
            <div className="row-span-5 w-full"></div>
          </div>
        </Link>
        <Link
          href={"/"}
          className="relative z-0 flex items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 bg-left-bottom p-4 text-gray-100 transition-all duration-300 hover:scale-[101%] hover:bg-zinc-950 hover:shadow-equal-lg hover:shadow-zinc-900/40"
        >
          <SettingsSVG
            className={
              "absolute bottom-0 right-0 -z-10 translate-x-1/3 translate-y-1/2 -rotate-12 opacity-25"
            }
            color="#064e3b"
            size={500}
          />
          <div className="grid h-full w-full grid-rows-6">
            <p className="row-span-1 flex w-full items-center border-b border-zinc-800">
              Settings
            </p>
            <div className="row-span-5 w-full"></div>
          </div>
        </Link>
      </div>
    </main>
  );
}
