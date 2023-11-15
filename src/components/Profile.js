"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { AuthContext } from "@/context/userContext";
import { useContext } from "react";
import UserSVG from "./svg/UserSVG";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  function handleSignOut() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/signOut`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status == 200) {
        router.push("/auth");
      }
    });
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full border-t border-zinc-700 pt-1">
        <Button className="grid w-full grid-cols-5 bg-zinc-800 text-gray-100 hover:bg-zinc-700">
          <UserSVG className={"col-span-1 w-full"} color="#f3f4f6" size={25} />
          <p className="col-span-4 border-l border-zinc-700">Profile</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="border-zinc-700 bg-zinc-800 text-gray-100">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>
            See your profile information here. Click the X when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-4 py-4">
          <div className="col-span-4 grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right">
              Username
            </label>
            <input
              name="username"
              placeholder={user?.username}
              className="col-span-3 rounded border border-zinc-700 px-4 py-2"
              disabled
            />
          </div>
          <div className="col-span-4 grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right">
              E-mail
            </label>
            <input
              name="username"
              placeholder={user?.email}
              className="col-span-3 rounded border border-zinc-700 px-4 py-2"
              disabled
            />
          </div>
          <div className="col-span-4 grid w-full grid-cols-4">
            <div className="col-span-3"></div>
            <div
              onClick={handleSignOut}
              className="cursor-pointer rounded border border-zinc-700 bg-zinc-700 py-2 text-center transition-colors hover:bg-zinc-600"
            >
              Sign Out
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
