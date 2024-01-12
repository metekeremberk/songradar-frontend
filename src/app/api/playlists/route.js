import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();

  const response = await fetch(`${process.env.NEXT_DB_URL}/playlists/`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${req.headers.get("Authorization")}`,
    },
    body: JSON.stringify(data),
  });

  if (response.status === 200) {
    return NextResponse.json("Successful.", { status: 200 });
  }

  return NextResponse.json("Validation Error", { status: 422 });
}
