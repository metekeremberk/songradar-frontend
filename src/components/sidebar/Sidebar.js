"use client";

import {
  Icon,
  HamburgerMenu,
  Search,
  AudioPlaylist,
  Dashboard,
  Settings,
  User,
  Close,
} from "./imports";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "@/context/userContext";

export default function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  const router = useRouter();

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleSignOut = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/signOut`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status == 200) {
        setUser(null);
        router.push("/auth");
      }
    });
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status == 200) {
        res.json().then((data) => {
          setUser(data);
        });
      } else {
        router.push("/auth");
      }
    });
  }, []);

  return (
    <div
      className={
        "relative flex h-full flex-col items-center justify-between overflow-hidden border-r bg-gray-50 transition-all delay-75 duration-500" +
        `${sidebar ? " w-60 min-w-[240px] " : " w-12 min-w-[48px] "}`
      }
    >
      <div className="mt-3 flex w-full flex-col items-center justify-center">
        <div className={"mb-3 flex w-full"}>
          <Link
            href={"/"}
            className={
              "transition-all duration-300" +
              `${sidebar ? " basis-4/5 pl-6" : " w-0 basis-0 opacity-0"}`
            }
          >
            SongRadar
          </Link>
          <Icon
            src={HamburgerMenu}
            alt="hamburger-menu"
            onClick={handleSidebar}
            className={
              "z-50 cursor-pointer " +
              `${sidebar ? " basis-1/5" : "basis-full"}`
            }
          />
        </div>
        <div className="mx-auto w-5/6 border-b" />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-start child:my-1">
        <div className="w-full child:py-3">
          <div className="w-full">
            <Link
              href={"/music/songs"}
              className={
                "flex rounded py-2 hover:bg-gray-200 " +
                `${sidebar ? " mx-3 bg-gray-100 delay-200" : " mx-1"}`
              }
            >
              <Icon
                src={Search}
                alt="search"
                className={
                  "z-50 cursor-pointer " +
                  `${
                    sidebar
                      ? " basis-1/5 duration-0"
                      : "basis-full delay-100 duration-300"
                  }`
                }
              />
              <p
                className={
                  "transition-all duration-300" +
                  `${
                    sidebar
                      ? " basis-4/5 pl-2"
                      : " w-0 basis-0 translate-y-5 opacity-0"
                  }`
                }
              >
                Songs
              </p>
            </Link>
          </div>
          <div className="w-full">
            <Link
              href={"/music/albums"}
              className={
                "flex rounded py-2 hover:bg-gray-200 " +
                `${sidebar ? " mx-3 bg-gray-100 delay-200" : " mx-1"}`
              }
            >
              <Icon
                src={AudioPlaylist}
                alt="audio-playlist"
                className={
                  "z-50 cursor-pointer " +
                  `${
                    sidebar
                      ? " basis-1/5 duration-0"
                      : "basis-full delay-100 duration-300"
                  }`
                }
              />
              <p
                className={
                  "transition-all duration-300" +
                  `${
                    sidebar
                      ? " basis-4/5 pl-2"
                      : " w-0 basis-0 translate-y-5 opacity-0"
                  }`
                }
              >
                Playlists
              </p>
            </Link>
          </div>
        </div>
        <div className="mx-auto w-4/5 border-b" />

        <div className="w-full child:py-3">
          <div className="w-full">
            <Link
              href={"/"}
              className={
                "flex rounded py-2 hover:bg-gray-200 " +
                `${sidebar ? " mx-3 bg-gray-100 delay-200" : " mx-1"}`
              }
            >
              <Icon
                src={Dashboard}
                alt="dashboard"
                className={
                  "z-50 cursor-pointer " +
                  `${
                    sidebar
                      ? " basis-1/5 duration-0"
                      : "basis-full delay-100 duration-300"
                  }`
                }
              />
              <p
                className={
                  "transition-all duration-300" +
                  `${
                    sidebar
                      ? " basis-4/5 pl-2"
                      : " w-0 basis-0 translate-y-5 opacity-0"
                  }`
                }
              >
                Dashboard
              </p>
            </Link>
          </div>
          <div className="w-full">
            <Link
              href={"/"}
              className={
                "flex rounded py-2 transition-all hover:bg-gray-200" +
                `${sidebar ? " mx-3 bg-gray-100 delay-200" : " mx-1"}`
              }
            >
              <Icon
                src={Settings}
                alt="settings"
                className={
                  "z-50 cursor-pointer " +
                  `${
                    sidebar
                      ? " basis-1/5 duration-0"
                      : "basis-full delay-100 duration-300"
                  }`
                }
              />
              <p
                className={
                  "transition-all duration-300" +
                  `${
                    sidebar
                      ? " basis-4/5 pl-2"
                      : " w-0 basis-0 translate-y-5 opacity-0"
                  }`
                }
              >
                Settings
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-between">
        <div className="mx-auto w-4/5 border-b" />
        <div className="my-3 w-full">
          <div
            className={
              "flex cursor-pointer rounded py-2 transition-all hover:bg-gray-200" +
              `${sidebar ? " mx-3 bg-gray-100 delay-200" : " mx-1"}`
            }
            onClick={() => {
              setProfileVisible(true);
            }}
          >
            <Icon
              src={User}
              alt="user"
              className={
                "z-50 " +
                `${
                  sidebar
                    ? " basis-1/5 duration-0"
                    : "basis-full delay-100 duration-300"
                }`
              }
            />
            <p
              className={
                "transition-all duration-300" +
                `${
                  sidebar
                    ? " basis-4/5 pl-2"
                    : " w-0 basis-0 translate-y-5 opacity-0"
                }`
              }
            >
              Profile
            </p>
          </div>
        </div>
      </div>

      {profileVisible && (
        <>
          <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-slate-400 bg-opacity-50 shadow backdrop-blur-sm">
            <div className="relative flex h-96 w-1/3 flex-col items-center justify-around rounded border bg-white pt-16">
              <div
                className="absolute right-5 top-5 z-50 hover:cursor-pointer"
                onClick={() => {
                  setProfileVisible(false);
                }}
              >
                <Icon src={Close} alt="close" />
              </div>
              <div className="absolute left-0 top-0 w-full border-b py-5 pl-10">
                Account
              </div>
              {user && (
                <>
                  <div className="flex h-full flex-col items-center justify-center gap-4">
                    <a>{user.username}</a>
                    <a>{user.email}</a>
                  </div>
                </>
              )}
              <div className="h-48 w-full p-12">
                <button
                  className="flex h-full w-full flex-col items-center justify-around rounded-xl bg-orange-200 px-10"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
