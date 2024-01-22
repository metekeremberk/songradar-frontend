import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const recommend = req.nextUrl.searchParams.get("recommend");

  const response = await fetch(
    `${process.env.NEXT_DB_URL}/recommend/playlist/${params.id}?recommend=${recommend}`,
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
    const playlists = await response.json();
    return NextResponse.json(playlists);
  }

  return NextResponse.json("Validation error.", { status: 422 });
}
