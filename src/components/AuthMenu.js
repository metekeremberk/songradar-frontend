"use client";

import { useFormState } from "react-dom";
import { useState } from "react";
import { onSignUp, onSignIn } from "@/app/(auth)/auth/actions";

function SignUp() {
  const [state, formAction] = useFormState(onSignUp, null);

  return (
    <div className="flex h-auto w-80 flex-col items-stretch justify-evenly bg-white p-10">
      <p className="mb-4 border-b pb-4">Sign Up</p>
      <form action={formAction} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 child:rounded child:border child:px-4 child:py-2">
          <input type="text" name="username" placeholder="Username" />
          <input type="email" name="email" placeholder="E-mail" />
          <input type="password" name="password" placeholder="Password" />
        </div>
        <p className="border-none px-0 text-xs text-red-600">{state?.detail}</p>
        <button type="submit" className="rounded border px-4 py-2">
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
    <div className="flex h-auto w-80 flex-col items-stretch justify-evenly bg-white p-10">
      <p className="mb-4 border-b pb-4">Sign In</p>
      <form action={formAction} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 child:rounded child:border child:px-4 child:py-2">
          <input type="text" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
        </div>
        {errorMessage !== null && (
          <p className="border-none px-0 text-xs text-red-600">
            {errorMessage}
          </p>
        )}
        <button type="submit" className="rounded border px-4 py-2">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default function AuthMenu() {
  const [menu, setMenu] = useState("sign_in");

  return (
    <div className="flex flex-col">
      <div className="flex w-full child:m-2 child:basis-1/2 child:rounded child:py-2 odd-child:mr-0 even-child:ml-0">
        <button
          onClick={() => {
            setMenu("sign_in");
          }}
          className={menu === "sign_in" ? "bg-slate-200" : ""}
        >
          Sign In
        </button>
        <button
          onClick={() => {
            setMenu("sign_up");
          }}
          className={menu === "sign_up" ? "bg-slate-200" : ""}
        >
          Sign Up
        </button>
      </div>
      <div className="mx-auto w-11/12 border-b" />
      <div>
        {menu === "sign_in" && <SignIn />}
        {menu === "sign_up" && <SignUp />}
      </div>
    </div>
  );
}
