"use client";

import { createContext, useState, useEffect } from "react";

export const songContext = createContext(null);

export default function SongContext({ children }) {
  const [songs, setSongs] = useState([]);

  // Get songs on initial render
  useEffect(() => {
    fetch("http://localhost:3000/api/music/songs", {
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

  // Update songs every 5 seconds
  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:3000/api/music/songs", {
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

  async function createSong(formData) {
    const data = {
      title: formData.get("title"),
      year: parseInt(formData.get("year")),
      genre: formData.get("genre"),
      performers: formData.get("performers"),
      album_id: parseInt(formData.get("album_id")),
    };

    fetch("http://localhost:3000/api/music/songs", {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async function deleteSong(formData) {
    if (formData.get("album") === "default") return;
    const data = JSON.parse(formData.get("album"));

    fetch("http://localhost:3000/api/music/songs", {
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