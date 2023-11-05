"use server";

import { baseAPIURL } from "./config";

const { cookies } = require("next/headers");

function checkToken() {
	if (cookies().has("access_token")) {
		return cookies().get("access_token");
	} else {
		return null;
	}
}

function getUser() {
	fetch(`${baseAPIURL}/auth/me`, {
		cache: "no-store",
		method: "GET",
		headers: {
			"accept": "application/json",
			"Authorization": cookies().get("access_token").value,
		},
	});
}

export { checkToken };
