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
			className="w-full rounded py-2 border text-center mt-4"
		>
			<button type="submit">Sign Out</button>
		</form>
	);
}
