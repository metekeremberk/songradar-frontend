"use client";

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const AuthContext = createContext(null);

export default function UserContext({ children }) {
  const [user, setUser] = useState();
  const router = useRouter();

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
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
