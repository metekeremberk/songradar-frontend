import { cookies } from "next/headers";

export default async function getUser() {
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
			"Authorization":
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0IiwiZXhwIjoxNjk5MTk0NjI1fQ.685bzh9LLUCKLDoGvmQ5hbM24fX7-rDf5qxE5JbERPQ",
		},
	});

	if (response.body) {
		const userData = await response.json();
		console.log("userData:", userData);
		return userData;
	}

	return null;
}
