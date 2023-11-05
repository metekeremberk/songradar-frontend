"use server";

import { baseAPIURL } from "../config";
import { cookies } from "next/headers";

async function onSignUp(prevState, formData) {
	const response = await fetch(`${baseAPIURL}/auth/sign_up`, {
		cache: "no-store",
		method: "POST",
		headers: {
			"accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			"username": formData.get("username"),
			"email": formData.get("email"),
			"password": formData.get("password"),
		}),
	});

	const res = await response.json();

	console.log(res);

	return res;
}

async function onSignIn(prevState, formData) {
	const response = await fetch(`${baseAPIURL}/auth/sign_in`, {
		method: "POST",
		headers: {
			"accept": "application/json",
		},
		body: new URLSearchParams({
			"grant_type": "",
			"username": formData.get("username"),
			"password": formData.get("password"),
			"scope": "",
			"client_id": "",
			"client_secret": "",
		}),
	});

	const res = await response.json();

	console.log(res);

	cookies().set("access_token", res?.access_token, { secure: true });

	return res;
}

function getToken() {
	if (cookies().has("access_token")) {
		return cookies().get("access_token");
	} else return null;
}

export { onSignUp, onSignIn, getToken };
