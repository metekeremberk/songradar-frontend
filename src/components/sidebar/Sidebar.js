"use client";

import Link from "next/link";
import {
  Contact2,
  Home,
  ListMusic,
  PlusSquare,
  Search,
  Settings,
  User,
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function Sidebar() {
  const { data: session } = useSession();
  const user = session.user;

  const buttons = [
    {
      svg: <Home color="#f3f4f6" size={25} />,
      title: "Home",
      href: "/home",
    },
    {
      svg: <Search color="#f3f4f6" size={25} />,
      title: "Search",
      href: "/search",
    },
    {
      svg: <PlusSquare color="#f3f4f6" size={25} />,
      title: "Add music",
      href: "/add",
    },
    {
      svg: <ListMusic color="#f3f4f6" size={25} />,
      title: "Playlists",
      href: "/playlists",
    },
    {
      svg: <Settings color="#f3f4f6" size={25} />,
      title: "Settings",
      href: "/settings",
    },
    {
      svg: <Contact2 color="#f3f4f6" size={25} />,
      title: "Friends",
      href: "/friends",
    },
    {
      svg: <User color="#f3f4f6" size={25} />,
      title: "Profile",
      href: "/user/" + user.id,
    },
  ];
  return (
    <div className="h-full w-[200px] min-w-[200px] border-r border-zinc-800 bg-zinc-900 shadow-xl">
      <div className="flex h-full w-full flex-col items-start gap-4 py-4">
        <div className="h-10 w-full cursor-default border-b border-zinc-800 px-4 opacity-80">
          SongRadar
        </div>
        {buttons?.map((button, i) => {
          return (
            <Link
              href={button.href}
              key={i}
              className="flex w-full items-center justify-start py-2 opacity-60 transition-opacity hover:opacity-90"
            >
              <div className="px-4">{button.svg}</div>
              <p className="border-zinc-700 pl-1 text-left">{button.title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
