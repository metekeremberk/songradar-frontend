"use server";

import { getUser } from "@/lib/auth";

export default async function UserInfo() {
  const currentUser = await getUser();
  return (
    <div className="flex w-full flex-col gap-3 pt-5">
      <div className="border-b pb-3">
        <p className="text-sm">Username</p>
        <div>{currentUser.username}</div>
      </div>
      <div className="border-b pb-3">
        <p className="text-sm">E-mail</p>
        <div>{currentUser.email}</div>
      </div>
    </div>
  );
}
