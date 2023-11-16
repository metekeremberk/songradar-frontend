"use client";

import { songContext } from "@/context/songContext";
import { useContext, useEffect, useState } from "react";
import { Combobox } from "../Combobox";

export default function DeleteSong() {
  const { songs, deleteSong } = useContext(songContext);
  const [id, setId] = useState(-1);
  const [comboboxArray, setComboboxArray] = useState([]);

  useEffect(() => {
    setComboboxArray(
      songs?.map((song) => {
        return { value: song.id, label: song.title };
      }),
    );
  }, [songs]);

  function onAction(formData) {
    const data = {
      id: id,
    };
    deleteSong(data);
  }
  return (
    <form
      action={onAction}
      className="flex min-w-[300px] flex-col gap-4 rounded border border-zinc-700 bg-zinc-800 p-4 shadow "
    >
      <Combobox
        items={comboboxArray}
        message={"Select song"}
        setId={setId}
        className="rounded border px-4 py-2"
      />
      <button
        type="submit"
        className="rounded border border-zinc-700 bg-zinc-900 px-4 py-2 text-gray-100 transition-colors hover:bg-zinc-800 "
      >
        Delete song
      </button>
    </form>
  );
}
