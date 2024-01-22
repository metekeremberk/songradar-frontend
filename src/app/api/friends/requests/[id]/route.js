import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const response = await fetch(
    `${process.env.NEXT_DB_URL}/friends/requests/${params.id}`,
    {
      cache: "no-store",
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.headers.get("Authorization")}`,
      },
    },
  );

  if (response.status === 200) {
    const playlists = await response.json();
    return NextResponse.json(playlists);
  }

  return NextResponse.json("Validation error.", { status: 422 });
}

export async function DELETE(req, { params }) {
  const response = await fetch(
    `${process.env.NEXT_DB_URL}/friends/requests/${params.id}`,
    {
      cache: "no-store",
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.headers.get("Authorization")}`,
      },
    },
  );

  if (response.status === 200) {
    const playlists = await response.json();
    return NextResponse.json(playlists);
  }

  return NextResponse.json("Validation error.", { status: 422 });
}
