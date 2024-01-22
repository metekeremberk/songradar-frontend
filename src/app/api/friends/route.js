import { NextResponse } from "next/server";

export async function GET(req) {
  const response = await fetch(`${process.env.NEXT_DB_URL}/friends/`, {
    cache: "no-store",
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${req.headers.get("Authorization")}`,
    },
  });

  if (response.status === 200) {
    const playlists = await response.json();
    return NextResponse.json(playlists);
  }

  return NextResponse.json("Validation error.", { status: 422 });
}
