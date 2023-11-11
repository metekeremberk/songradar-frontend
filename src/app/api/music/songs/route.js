import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    "http://127.0.0.1:8000/debug/songs?skip=0&limit=100",
    {
      cache: "no-store",
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  if (response.status === 200) {
    const songs = await response.json();
    return NextResponse.json(songs);
  }

  return NextResponse.json("Validation error.", { status: 422 });
}

export async function POST(req) {
  const data = await req.json();

  const response = await fetch("http://127.0.0.1:8000/debug/songs", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.status === 200) {
    return NextResponse.json("Successful.", { status: 200 });
  }

  return NextResponse.json("Validation Error", { status: 422 });
}

export async function DELETE(req) {
  const data = await req.json();

  const response = await fetch(
    `http://127.0.0.1:8000/debug/songs?songs_id=${data.id}`,
    {
      method: "DELETE",
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
