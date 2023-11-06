"use client";

import Image from "next/image";
import { Close } from "../sidebar/imports";
import { useRouter } from "next/navigation";

export default function CloseButton() {
  const router = useRouter();
  return (
    <div
      className="absolute right-5 top-5 z-50 hover:cursor-pointer"
      onClick={() => {
        router.back();
      }}
    >
      <Image src={Close} height={20} alt="close" />
    </div>
  );
}
