"use client";

import { signIn } from "next-auth/react";
import { useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const username = useRef("");
  const password = useRef("");

  const searchParams = useSearchParams();

  async function onSubmit(e) {
    e.preventDefault();
    await signIn("credentials", {
      username: username.current,
      password: password.current,
      redirect: true,
      callbackUrl: "/home",
    });
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-auto w-80 flex-col items-stretch justify-evenly rounded border border-zinc-700 bg-zinc-900 p-10 shadow-equal-lg shadow-zinc-800/25">
        <p className="mb-4 border-b border-zinc-700 pb-4">Sign In</p>
        <form className="flex flex-col gap-2" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2 border-b border-zinc-700 pb-4 child:rounded child:border child:border-zinc-700 child:bg-zinc-800 child:px-4 child:py-2">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => (username.current = e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => (password.current = e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded border border-zinc-700 bg-zinc-800 px-4 py-2 transition-colors hover:bg-zinc-700"
          >
            Sign In
          </button>
          <Link
            href={"./signup?callbackUrl=" + searchParams.get("callbackUrl")}
            className="text-xs hover:underline"
          >
            Don't have an account? Sign up
          </Link>
        </form>
      </div>
    </div>
  );
}
