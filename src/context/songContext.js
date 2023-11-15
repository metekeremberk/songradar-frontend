"use client";

import { createContext, useState, useEffect } from "react";

export const songContext = createContext(null);

export default function SongContext({ children }) {
  const [songs, setSongs] = useState([]);

  // Get songs on initial render
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/music/songs`, {
      cache: "no-store",
      method: "GET",
    }).then((res) => {
      if (res.status == 200) {
        res.json().then((data) => {
          setSongs(data);
        });
      }
    });
  }, []);

  // Update songs every 10 seconds
  useEffect(() => {
    setTimeout(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/music/songs`, {
        cache: "no-store",
        method: "GET",
      }).then((res) => {
        if (res.status == 200) {
          res.json().then((data) => {
            setSongs(data);
          });
        }
      });
    }, 10000);
  });

  async function createSong(data) {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/music/songs`, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async function deleteSong(data) {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/music/songs`, {
      cache: "no-store",
      method: "DELETE",
      body: JSON.stringify(data),
    });
  }

  return (
    <songContext.Provider value={{ songs, createSong, deleteSong }}>
      {children}
    </songContext.Provider>
  );
}
