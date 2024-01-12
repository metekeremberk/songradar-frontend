import { NextResponse } from "next/server";

export async function PUT({ params }) {
  const response = await fetch(
    `${process.env.NEXT_DB_URL}/playlists/${params.id}/${params.song_id}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  if (response.status === 200) {
    return NextResponse.json("Successful.", { status: 200 });
  }

  return NextResponse.json("Validation Error", { status: 422 });
}

export async function DELETE({ params }) {
  const response = await fetch(
    `${process.env.NEXT_DB_URL}/playlists/${params.id}/${params.song_id}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  if (response.status === 200) {
    return NextResponse.json("Successful.", { status: 200 });
  }

  return NextResponse.json("Validation Error", { status: 422 });
}
