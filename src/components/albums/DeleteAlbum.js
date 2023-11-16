"use client";

import { albumContext } from "@/context/albumContext";
import { useContext, useEffect, useState } from "react";
import { Combobox } from "../Combobox";

export default function DeleteAlbum() {
  const { albums, deleteAlbum } = useContext(albumContext);
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
      id: id,
    };

    deleteAlbum(data);
  }

  return (
    <form
      action={onAction}
      className="flex min-w-[300px] flex-col gap-4 rounded border border-zinc-700 bg-zinc-800 p-4 shadow "
    >
      <Combobox
        items={comboboxArray}
        message={"Select album"}
        setId={setId}
        className="rounded border px-4 py-2"
      />
      <button
        type="submit"
        className="rounded border border-zinc-700 bg-zinc-900 px-4 py-2 text-gray-100 transition-colors hover:bg-zinc-800"
      >
        Delete album
      </button>
    </form>
  );
}
