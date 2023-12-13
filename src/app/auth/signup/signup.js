"use server";

import { NextResponse } from "next/server";

export async function signUp(newUser) {
  const response = await fetch(`${process.env.NEXT_DB_URL}/auth/sign_up`, {
    cache: "no-store",
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (response.status === 200)
    return NextResponse.json("Successful.", { status: 200 });
  else if (response.status === 422)
    return NextResponse.json("Unprocessable entity.", { status: 422 });
  else if (response.status === 400)
    return NextResponse.json("Bad request.", { status: 400 });

  // return NextResponse.json(response);
}
