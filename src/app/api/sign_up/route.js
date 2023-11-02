"use server";

export async function POST() {
	const res = await fetch("http://127.0.0.1:8000/auth/sign_up", {
		method: "POST",
		headers: {
			"accept": "application/json",
			"Content-Type": "application/json",
		},
		// body: '{\n  "username": "string",\n  "email": "string",\n  "password": "string"\n}',
		body: JSON.stringify({
			"username": "string",
			"email": "string",
			"password": "string",
		}),
		mode: "no-cors",
	});
	const data = await res.json();

	return Response.json({ data });
}
