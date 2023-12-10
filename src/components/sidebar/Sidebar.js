import Link from "next/link";
import Profile from "../Profile";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import MenuSVG from "../svg/MenuSVG";
import MusicSVG from "../svg/MusicSVG";
import FolderSVG from "../svg/FolderSVG";
import SettingsSVG from "../svg/SettingsSVG";
import UserSVG from "../svg/UserSVG";

const buttons = [
  {
    svg: <MusicSVG className={"w-full"} color="#f3f4f6" size={25} />,
    title: "Albums",
    href: "/music/albums",
  },
  {
    svg: <FolderSVG className={"w-full"} color="#f3f4f6" size={25} />,
    title: "Playlists",
    href: "/playlists",
  },
  {
    svg: <SettingsSVG className={"w-full"} color="#f3f4f6" size={25} />,
    title: "Settings",
    href: "/settings",
  },
  {
    svg: <UserSVG className={"w-full"} color="#f3f4f6" size={25} />,
    title: "Friends",
    href: "/friends",
  },
];

export default function Sidebar() {
  return (
    <div className="h-full border-r border-zinc-800 bg-zinc-900 shadow-xl">
      <Sheet>
        <SheetTrigger className="mx-3 mt-3 rounded border border-zinc-800 transition-all hover:bg-zinc-800">
          <MenuSVG className={"m-1"} color="#f3f4f6" size={28} />
        </SheetTrigger>
        <SheetContent
          className="flex flex-col justify-between border-r border-zinc-700 bg-zinc-800 pb-2 text-gray-100"
          side="left"
        >
          <Link href={"/"} className="border-b border-zinc-700 pb-2">
            <SheetHeader>SongRadar</SheetHeader>
            <SheetDescription>SongRadar description</SheetDescription>
          </Link>
          <div className="flex h-full w-full flex-col items-start gap-4">
            {buttons?.map((button, i) => {
              return (
                <Link
                  href={button.href}
                  key={i}
                  className="grid w-full grid-cols-5 items-center rounded border border-zinc-700 bg-zinc-800 px-4 py-2 hover:bg-zinc-700"
                >
                  {button.svg}
                  <p className="col-span-4 border-l border-zinc-700 pl-1 text-left">
                    {button.title}
                  </p>
                </Link>
              );
            })}
          </div>
          <Profile />
        </SheetContent>
      </Sheet>
    </div>
  );
}
