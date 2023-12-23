import { NextResponse } from "next/server";

export async function GET(req) {
  const name = req.nextUrl.searchParams.get("name");
  const skip = req.nextUrl.searchParams.get("skip");
  const limit = req.nextUrl.searchParams.get("limit");

  const response = await fetch(
    `${process.env.NEXT_DB_URL}/albums/search_name?name=${name}&skip=${skip}&limit=${limit}`,
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
