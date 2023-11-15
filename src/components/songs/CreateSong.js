"use client";

import { albumContext } from "@/context/albumContext";
import { songContext } from "@/context/songContext";
import { useContext, useEffect, useState } from "react";
import { Combobox } from "../Combobox";

export default function CreateSong() {
  const { createSong } = useContext(songContext);
  const { albums } = useContext(albumContext);
  const [comboboxArray, setComboboxArray] = useState([]);
  const [id, setId] = useState(-1);

  useEffect(() => {
    setComboboxArray(
      albums.map((album) => {
        return { value: album.id, label: album.title };
      }),
    );
  }, [albums]);

  function onAction(formData) {
    const data = {
      title: formData.get("title"),
      year: parseInt(formData.get("year")),
      genre: formData.get("genre"),
      performers: formData.get("performers"),
      album_id: id,
    };

    createSong(data);
  }

  return (
    <form
      action={onAction}
      className="child:rounded child:border child:px-4 child:py-2 my-auto flex min-w-[300px] flex-col gap-4 rounded border bg-gray-50 p-4 shadow"
    >
      <input type="text" name="title" placeholder="Title" required />
      <input type="number" name="year" placeholder="Year" required />
      <input type="text" name="genre" placeholder="Genre" required />
      <input type="text" name="performers" placeholder="Performers" required />
      <Combobox items={comboboxArray} message={"Select album"} setId={setId} />
      <button type="submit" className="bg-gray-800 text-gray-50 ">
        Create
      </button>
    </form>
  );
}
