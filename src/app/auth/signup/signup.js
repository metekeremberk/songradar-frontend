"use server";

import { NextResponse } from "next/server";

export async function signUp(newUser) {
  const body = JSON.stringify(newUser);
  const response = await fetch(`${process.env.NEXT_DB_URL}/auth/sign_up`, {
    cache: "no-store",
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (response.status === 200) return { status: 200 };
  else if (response.status === 422) return { status: 422 };
  else if (response.status === 400) return { status: 400 };

  // return NextResponse.json(response);
}
