import { NextResponse } from "next/server";

export async function GET(req, context) {
  const response = await fetch(
    `${process.env.NEXT_DB_URL}/albums/${context.params.id}`,
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
