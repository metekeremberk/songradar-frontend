import { NextResponse } from "next/server";

export async function DELETE({ params }) {
  const response = await fetch(
    `${process.env.NEXT_DB_URL}/songs/${params.id}`,
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
