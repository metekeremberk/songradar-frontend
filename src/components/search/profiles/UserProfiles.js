"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { User, UserPlus } from "lucide-react";
import { useSession } from "next-auth/react";
export default function UserProfile({ user }) {
  const { data: session } = useSession();

  function handleRequest() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/friends/send/${user.id}`, {
      cache: "no-store",
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${session.accessToken}`,
      },
      body: "",
    });
  }
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex cursor-default gap-2 rounded border border-zinc-700 bg-zinc-800 px-4 py-2 transition-colors hover:bg-zinc-700">
        <User />
        <p className="text-xl">{user.username}</p>
      </ContextMenuTrigger>
      <ContextMenuContent className="border-zinc-800 bg-zinc-900 text-gray-50">
        <ContextMenuItem className="focus:bg-zinc-800 focus:text-gray-50">
          <button className="flex h-full w-full gap-2" onClick={handleRequest}>
            <UserPlus className="opacity-60" size={20} />
            <p>Send friend request</p>
          </button>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
