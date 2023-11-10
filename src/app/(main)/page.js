"use client";

import { AuthContext } from "@/context/userContext";
import { useContext } from "react";

export default function Home() {
  const { user } = useContext(AuthContext);

  return <main>{user?.username}</main>;
}
