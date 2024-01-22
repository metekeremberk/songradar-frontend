"use client";

import Loading from "@/components/loading/Loading";
import React, { useEffect, useState } from "react";
import UserProfile from "./UserProfiles";

export default function Profiles({ searchWord }) {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  function getUsers() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/debug/users`, {
      cache: "no-store",
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    getUsers();
    setIsLoading(false);
  }, [searchWord]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="flex items-center gap-3">
        {users?.map((user, i) => {
          return <UserProfile user={user} key={i} />;
        })}
      </div>
    );
  }
}
