"use client";

import { useFormState } from "react-dom";
import { useState } from "react";
import { onSignUp, onSignIn } from "@/lib/auth";

function SignUp() {
  const [state, formAction] = useFormState(onSignUp, null);

  return (
    <div className="flex h-auto w-80 flex-col items-stretch justify-evenly bg-zinc-900 p-10">
      <p className="mb-4 border-b border-zinc-700 pb-4">Sign Up</p>
      <form action={formAction} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 child:rounded child:border child:border-zinc-700 child:bg-zinc-800 child:px-4 child:py-2">
          <input type="text" name="username" placeholder="Username" />
          <input type="email" name="email" placeholder="E-mail" />
          <input type="password" name="password" placeholder="Password" />
        </div>
        <p className="border-none px-0 text-xs text-red-600">{state?.detail}</p>
        <button
          type="submit"
          className="rounded border border-zinc-700 px-4 py-2 transition-colors hover:bg-zinc-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

function SignIn() {
  const [state, formAction] = useFormState(onSignIn, null);

  const errorMessage = state?.detail;

  return (
    <div className="flex h-auto w-80 flex-col items-stretch justify-evenly bg-zinc-900 p-10">
      <p className="mb-4 border-b border-zinc-700 pb-4">Sign In</p>
      <form action={formAction} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 child:rounded child:border child:border-zinc-700 child:bg-zinc-800 child:px-4 child:py-2">
          <input type="text" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
        </div>
        {errorMessage !== null && (
          <p className="border-none px-0 text-xs text-red-600">
            {errorMessage}
          </p>
        )}
        <button
          type="submit"
          className="rounded border border-zinc-700 bg-zinc-800 px-4 py-2 transition-colors hover:bg-zinc-700"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default function AuthMenu() {
  const [menu, setMenu] = useState("sign_in");

  return (
    <div className="flex flex-col rounded-lg border-zinc-700 bg-zinc-900 text-gray-100 shadow-equal-xl shadow-zinc-900/30">
      <div className="flex w-full p-2">
        <button
          onClick={() => {
            setMenu("sign_in");
          }}
          className={
            "ml-2 basis-1/2 rounded py-2 transition-colors hover:bg-zinc-800 " +
            `${menu === "sign_in" ? "bg-zinc-700" : ""}`
          }
        >
          Sign In
        </button>
        <button
          onClick={() => {
            setMenu("sign_up");
          }}
          className={
            "mr-2 basis-1/2 rounded py-2 transition-colors hover:bg-zinc-800 " +
            `${menu === "sign_up" ? "bg-zinc-700" : ""}`
          }
        >
          Sign Up
        </button>
      </div>
      <div className="mx-auto w-11/12 border-b border-zinc-700" />
      <div>
        {menu === "sign_in" && <SignIn />}
        {menu === "sign_up" && <SignUp />}
      </div>
    </div>
  );
}
