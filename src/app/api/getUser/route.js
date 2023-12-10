import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const accessToken = cookies().get("access_token");

  if (!accessToken) {
    return NextResponse.json("No user found", { status: 401 });
  }

  const response = await fetch(`${process.env.NEXT_DB_URL}/auth/me`, {
    cache: "no-store",
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken.value}`,
    },
  });

  if (response.status === 200) {
    const userData = await response.json();
    return NextResponse.json(userData);
  }

  return NextResponse.json("No user found", { status: 401 });
}
