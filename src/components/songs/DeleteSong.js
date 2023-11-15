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
      className="child:rounded child:border child:px-4 child:py-2 flex min-w-[300px] flex-col gap-4 rounded border bg-gray-50 p-4 shadow"
    >
      <Combobox items={comboboxArray} message={"Select song"} setId={setId} />
      <button type="submit" className="bg-gray-800 text-gray-50 ">
        Delete song
      </button>
    </form>
  );
}
