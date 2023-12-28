import { NextResponse } from "next/server";

export async function GET(req) {
  const skip = req.nextUrl.searchParams.get("skip");
  const limit = req.nextUrl.searchParams.get("limit");

  const response = await fetch(
    `${process.env.NEXT_DB_URL}/albums/?skip=${skip}&limit=${limit}`,
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

export async function POST(req) {
  const data = await req.json();

  const response = await fetch(`${process.env.NEXT_DB_URL}/debug/album`, {
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
    `${process.env.NEXT_DB_URL}/debug/album?album_id=${data.id}`,
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
