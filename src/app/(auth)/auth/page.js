import { getUser } from "@/lib/auth";
import AuthMenu from "@/components/AuthMenu";
import { redirect } from "next/navigation";

export default async function AuthPage() {
  const currentUser = await getUser();

  if (currentUser !== null) {
    redirect("/");
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-950 backdrop-blur child:border">
      <AuthMenu />
    </div>
  );
}
