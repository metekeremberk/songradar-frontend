"use client";

import {
  Icon,
  HamburgerMenu,
  Search,
  AudioPlaylist,
  Dashboard,
  Settings,
  User,
} from "./imports";
import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [sidebar, setSidebar] = useState(false);

  const handleClick = () => {
    setSidebar(!sidebar);
  };

  return (
    <div
      className={
        "relative flex h-full flex-col items-center justify-between overflow-hidden border-r transition-all duration-300" +
        `${sidebar ? " w-80 " : " w-12 "}`
      }
    >
      <div className="my-3 flex w-full flex-col items-center">
        <Icon
          src={HamburgerMenu}
          alt="hamburger-menu"
          onClick={handleClick}
          className={"mb-3 hover:cursor-pointer"}
        />
        <div className="mx-auto w-4/5 border-b" />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-start child:my-1">
        <div className="child:py-3">
          <div>
            <Link href={"/"} className="">
              <Icon src={Search} alt="search" />
            </Link>
          </div>
          <div>
            <Link href={"/"}>
              <Icon src={AudioPlaylist} alt="audio-playlist" />
            </Link>
          </div>
        </div>
        <div className="mx-auto w-4/5 border-b" />

        <div className="child:py-3">
          <div>
            <Link href={"/"}>
              <Icon src={Dashboard} alt="dashboard" />
            </Link>
          </div>
          <div>
            <Link href={"/"}>
              <Icon src={Settings} alt="settings" />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-between">
        <div className="mx-auto w-4/5 border-b" />
        <Link className="my-4" href={"/profile?"}>
          <Icon src={User} alt="user" />
        </Link>
      </div>
    </div>
  );
}
