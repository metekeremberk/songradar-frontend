"use client";

import { Icon, HamburgerMenu, Search, AudioPlaylist, Dashboard, Settings, User, Close } from "./imports";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const [user, setUser] = useState(null)
  const [profileVisible, setProfileVisible] = useState(false)

  const router = useRouter()

  const handleClick = () => {
    setSidebar(!sidebar);
  };

  const handleSignOut = () => {
    const response = fetch("http://localhost:3000/api/signOut", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status == 200) {
        setUser(null)
        router.push("/auth")
      }
    })
  }

  useEffect(() => {
    const response = fetch("http://localhost:3000/api/getUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status == 200) {
        res.json().then((data) => {
          setUser(data)
        });
      } else {
        router.push("/auth")
      }
    })
  }, [])

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
        <div className="my-4 cursor-pointer" onClick={() => { setProfileVisible(true) }}>
          <Icon src={User} alt="user" />
        </div>
      </div>

      {profileVisible && <>
        <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-slate-400 bg-opacity-50 shadow backdrop-blur-sm">
          <div className="relative flex h-96 w-1/3 flex-col items-center justify-around rounded border bg-white pt-16">
            <div className="absolute right-5 top-5 z-50 hover:cursor-pointer" onClick={() => { setProfileVisible(false) }}>
              <Image src={Close} height={20} alt="close" />
            </div>
            <div className="absolute left-0 top-0 w-full border-b py-5 pl-10">
              Account
            </div>
            {user && <>
              <div className="flex flex-col justify-center h-full items-center gap-4">
                <a>{user.username}</a>
                <a>{user.email}</a>
              </div>
            </>}
            <div className="w-full h-48 p-12">
              <button className="flex h-full w-full flex-col items-center justify-around px-10 bg-orange-200 rounded-xl" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>

          </div>
        </div>
      </>}
    </div>
  );
}
