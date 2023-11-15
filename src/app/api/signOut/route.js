import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  if (cookies().has("access_token")) {
    cookies().delete("access_token");
    return NextResponse.json("OK", { status: 200 });
  }

  return NextResponse.json("Unauthorized", { status: 401 });
}
