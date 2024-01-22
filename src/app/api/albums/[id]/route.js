import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const response = await fetch(
    `${process.env.NEXT_DB_URL}/albums/${params.id}`,
    {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.headers.get("Authorization")}`,
      },
    },
  );

  if (response.status === 200) {
    return NextResponse.json("Successful.", { status: 200 });
  }

  return NextResponse.json("Validation Error", { status: 422 });
}
