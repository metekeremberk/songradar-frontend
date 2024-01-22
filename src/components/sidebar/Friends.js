"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UserProfile from "../search/profiles/UserProfiles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Check, X } from "lucide-react";

export default function Friends() {
  const [isLoading, setIsLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const { data: session } = useSession();

  function getFriends() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/friends`, {
      cache: "no-store",
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${session.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setFriends(data));
  }

  function getFriendRequests() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/friends/requests/pending`, {
      cache: "no-store",
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${session.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setFriendRequests(data));
  }

  useEffect(() => {
    setIsLoading(true);
    getFriends();
    getFriendRequests();
    setIsLoading(false);
  }, []);

  function acceptRequest(request) {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/friends/requests/${request.id}`,
      {
        cache: "no-store",
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${session.accessToken}`,
        },
      },
    );
  }

  function denyRequest(request) {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/friends/requests/${request.id}`,
      {
        cache: "no-store",
        method: "DELETE",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${session.accessToken}`,
        },
      },
    );
  }

  return (
    <Tabs
      defaultValue="friends"
      className="flex h-full w-[200px] min-w-[200px] basis-[200px] flex-col items-center gap-3 border-l border-zinc-800 bg-zinc-900 shadow-xl"
    >
      <div className="h-10 w-full cursor-default border-b border-zinc-800 px-4 py-4 opacity-80">
        Friends
      </div>
      <TabsList>
        <TabsTrigger value="friends">Friends</TabsTrigger>
        <TabsTrigger value="pending">Requests</TabsTrigger>
      </TabsList>
      <TabsContent value="friends">
        <div className="flex h-full w-full flex-col items-center gap-4">
          {friends.map((friend, i) => {
            return <UserProfile user={friend} key={i} />;
          })}
        </div>
      </TabsContent>
      <TabsContent value="pending">
        {friendRequests.map((request, i) => {
          const name =
            request.requester_name.length > 8
              ? request.requester_name.substring(0, 8 - 3) + "..."
              : request.requester_name;
          return (
            <div key={i} className="flex items-center gap-2">
              <p>{name}</p>
              <button
                onClick={() => acceptRequest(request)}
                className="rounded-full p-1 transition-colors hover:bg-zinc-700"
              >
                <Check />
              </button>
              <button
                onClick={() => denyRequest(request)}
                className="rounded-full p-1 transition-colors hover:bg-zinc-700"
              >
                <X />
              </button>
            </div>
          );
        })}
      </TabsContent>
    </Tabs>
  );
}
