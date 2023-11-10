"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function Page() {
  const [albums, setAlbums] = useState([]);

  // Get albums on initial render
  useEffect(() => {
    fetch("http://localhost:3000/api/albums", {
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

  // Update albums every 5 seconds
  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:3000/api/albums", {
        cache: "no-store",
        method: "GET",
      }).then((res) => {
        if (res.status == 200) {
          res.json().then((data) => {
            setAlbums(data);
          });
        }
      });
    }, 5000);
  });

  async function createAlbum(formData) {
    const data = {
      title: formData.get("title"),
      year: parseInt(formData.get("year")),
      genre: formData.get("genre"),
      performers: formData.get("performers"),
    };

    const response = fetch("http://localhost:3000/api/albums", {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(data),
    });

    console.log((await response).status);
  }

  return (
    <div className="flex w-full items-center justify-around">
      <form
        action={createAlbum}
        className="flex min-w-[300px] flex-col gap-4 rounded border bg-gray-50 p-4 shadow child:rounded child:border child:px-4 child:py-2"
      >
        <div className="w-full border-none text-center">Create Album</div>
        <input type="text" name="title" placeholder="Title" required />
        <input type="number" name="year" placeholder="Year" required />
        <input type="text" name="genre" placeholder="Genre" required />
        <input
          type="text"
          name="performers"
          placeholder="Performers"
          required
        />
        <button type="submit" className="bg-gray-800 text-gray-50 ">
          Create
        </button>
      </form>
      <div>
        {albums?.map((album, index) => {
          return (
            <li key={index}>
              <div>{album.title}</div>
            </li>
          );
        })}
      </div>
    </div>
  );
}
