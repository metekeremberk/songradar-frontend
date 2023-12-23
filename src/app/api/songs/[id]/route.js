import { NextResponse } from "next/server";

export async function GET({ params }) {
  const response = await fetch(
    `${process.env.NEXT_DB_URL}/songs/${params.id}`,
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
