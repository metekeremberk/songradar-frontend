import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    "http://127.0.0.1:8000/debug/albums?skip=0&limit=100",
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
    const albums = await response.json();
    return NextResponse.json(albums);
  }

  return NextResponse.json("Validation error.", { status: 422 });
}

export async function POST(req, res) {
  const data = await req.json();

  const response = await fetch("http://127.0.0.1:8000/debug/album", {
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
