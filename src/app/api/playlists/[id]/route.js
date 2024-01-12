import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const response = await fetch(
    `${process.env.NEXT_DB_URL}/playlists/${params.id}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  if (response.status === 200) {
    const playlist = await response.json();
    return NextResponse.json(playlist);
  } else if (response.status === 404) {
    return NextResponse.json("Not found", { status: 404 });
  }

  return NextResponse.json("Validation Error", { status: 422 });
}

export async function PUT(req, { params }) {
  const new_name = req.nextUrl.searchParams.get("new_name");

  const response = await fetch(
    `${process.env.NEXT_DB_URL}/playlists/${params.id}?new_name=${new_name}`,
    {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.headers.get("Authorization")}`,
      },
    },
  );

  if (response.status === 200) {
    return NextResponse.json("Successful.", { status: 200 });
  }

  return NextResponse.json("Validation Error", { status: 422 });
}

export async function DELETE(req, { params }) {
  const response = await fetch(
    `${process.env.NEXT_DB_URL}/playlists/${params.id}`,
    {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.headers.get("Authorization")}`,
      },
    },
  );

  if (response.status === 200) {
    return NextResponse.json("Successful.", { status: 200 });
  }

  return NextResponse.json("Validation Error", { status: 422 });
}
