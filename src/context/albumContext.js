"use client";

import { createContext, useState, useEffect } from "react";

export const albumContext = createContext(null);

export default function AlbumContext({ children }) {
  const [albums, setAlbums] = useState([]);
  const [response, setResponse] = useState(null);

  // Get albums on initial render
  useEffect(() => {
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
  }, []);

  // Update albums every 10 seconds
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

  async function createAlbum(data) {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/music/albums`, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => setResponse(res));

    return response;
  }

  async function deleteAlbum(data) {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/music/albums`, {
      cache: "no-store",
      method: "DELETE",
      body: JSON.stringify(data),
    }).then((res) => setResponse(res));

    return response;
  }

  return (
    <albumContext.Provider value={{ albums, createAlbum, deleteAlbum }}>
      {children}
    </albumContext.Provider>
  );
}
