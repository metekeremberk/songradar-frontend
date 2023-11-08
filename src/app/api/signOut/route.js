import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {

  if (cookies().has("access_token")) {
    cookies().delete("access_token");
    return new NextResponse('OK');
  }

  return new NextResponse.json('Unauthorized', { status: 401 });
}