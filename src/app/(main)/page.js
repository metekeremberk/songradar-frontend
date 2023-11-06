import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUser();

  if (user === null) {
    redirect("/auth");
  }

  return <main></main>;
}
