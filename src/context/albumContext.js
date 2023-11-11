"use client";

import { createContext, useState, useEffect } from "react";

export const albumContext = createContext(null);

export default function AlbumContext({ children }) {
  const [albums, setAlbums] = useState([]);

  // Get albums on initial render
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/music/albums`, {
      cache: "no-store",
      method: "GET",
    }).then((res) => {
      if (res.status == 200) {
        res.json().then((data) => {
          console.log(data);
          setAlbums(data);
        });
      }
    });
  }, []);

  // Update albums every 5 seconds
  useEffect(() => {
    setTimeout(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/music/albums`, {
        cache: "no-store",
        method: "GET",
      }).then((res) => {
        if (res.status == 200) {
          res.json().then((data) => {
            setAlbums(data);
          });
        }
      });
    }, 10000);
  });

  async function createAlbum(formData) {
    const data = {
      title: formData.get("title"),
      year: parseInt(formData.get("year")),
      genre: formData.get("genre"),
      performers: formData.get("performers"),
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/music/albums`, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async function deleteAlbum(formData) {
    if (formData.get("album") === "default") return;
    const data = JSON.parse(formData.get("album"));

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/music/albums`, {
      cache: "no-store",
      method: "DELETE",
      body: JSON.stringify(data),
    });
  }

  return (
    <albumContext.Provider value={{ albums, createAlbum, deleteAlbum }}>
      {children}
    </albumContext.Provider>
  );
}
