import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const response = await fetch(
    `${process.env.NEXT_DB_URL}/albums/cover/${params.id}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  if (response.status === 200) {
    const coverUrl = await response.json();
    return NextResponse.json(coverUrl);
  } else if (response.status === 404) {
    return NextResponse.json("Not found", { status: 404 });
  }

  return NextResponse.json("Validation Error", { status: 422 });
}
