"use client";

import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  router.back();
}
