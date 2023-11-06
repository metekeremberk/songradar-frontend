"use server";

import { cookies } from "next/headers";

export async function getUser() {
	const accessToken = cookies().get("access_token");
	console.log("accessToken:", accessToken);

	if (!accessToken) {
		return null;
	}

	const response = await fetch("http://127.0.0.1:8000/auth/me", {
		cache: "no-store",
		method: "GET",
		headers: {
			"accept": "application/json",
			"Authorization": `Bearer ${accessToken.value}`,
		},
	});

	if (response.status === 200) {
		const userData = await response.json();
		console.log("userData:", userData);
		return userData;
	}

	return null;
}

export async function signOut() {
	cookies().delete("access_token");
}
