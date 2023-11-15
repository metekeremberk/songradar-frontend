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
      className="child:rounded child:border child:px-4 child:py-2 flex min-w-[300px] flex-col gap-4 rounded border bg-gray-50 p-4 shadow"
    >
      <Combobox items={comboboxArray} message={"Select album"} setId={setId} />
      <button type="submit" className="bg-gray-800 text-gray-50 ">
        Delete album
      </button>
    </form>
  );
}
