import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const response = await fetch(
    `${process.env.NEXT_DB_URL}/friends/send/${params.id}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.headers.get("Authorization")}`,
      },
      body: "",
    },
  );

  if (response.status === 200) {
    return NextResponse.json("Successful.", { status: 200 });
  }

  return NextResponse.json("Validation Error", { status: 422 });
}
