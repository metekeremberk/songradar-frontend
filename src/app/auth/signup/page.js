"use client";

import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { signUp } from "./signup";

export default function SignUp() {
  const username = useRef("");
  const password = useRef("");
  const email = useRef("");
  const response = useRef({});

  const searchParams = useSearchParams();

  async function onSubmit(e) {
    e.preventDefault();

    const newUser = {
      username: username.current,
      password: password.current,
      email: email.current,
    };

    const res = await signUp(newUser);

    console.log(res);

    if (res.status === 200)
      redirect("./signin?callbackUrl=" + searchParams.get("callbackUrl"));
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-auto w-80 flex-col items-stretch justify-evenly rounded border border-zinc-700 bg-zinc-900 p-10 shadow-equal-lg shadow-zinc-800/25">
        <p className="mb-4 border-b border-zinc-700 pb-4">Sign Up</p>
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 border-b border-zinc-700 pb-4 child:rounded child:border child:border-zinc-700 child:bg-zinc-800 child:px-4 child:py-2">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => (username.current = e.target.value)}
              onSubmit={(e) => (username.current = e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              onChange={(e) => (email.current = e.target.value)}
              onSubmit={(e) => (email.current = e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => (password.current = e.target.value)}
              onSubmit={(e) => (password.current = e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded border border-zinc-700 px-4 py-2 transition-colors hover:bg-zinc-700"
          >
            Sign Up
          </button>
          <Link
            href={"./signin?callbackUrl=" + searchParams.get("callbackUrl")}
            className="text-xs hover:underline"
          >
            Have an account? Sign in
          </Link>
        </form>
      </div>
    </div>
  );
}
