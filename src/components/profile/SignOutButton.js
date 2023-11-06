"use client";

import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default async function SignOutButton() {
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signOut();
        router.refresh();
      }}
      className="mt-4 w-full max-w-xs rounded border py-2 text-center"
    >
      <button type="submit">Sign Out</button>
    </form>
  );
}
