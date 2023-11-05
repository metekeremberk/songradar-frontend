import { cookies } from "next/headers";

export default async function getUser() {
	const user = await fetch(`localhost:8000/auth/me`, {
		cache: "no-store",
		method: "GET",
		headers: {
			"accept": "application/json",
			"Authorization": cookies().get("access_token").value,
		},
	});

	return user;
}
