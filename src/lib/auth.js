"use server";

import { cookies } from "next/headers";
import { baseAPIURL } from "./config";

async function onSignUp(prevState, formData) {
  const response = await fetch(`${baseAPIURL}/auth/sign_up`, {
    cache: "no-store",
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    }),
  });

  const res = await response.json();
  if (res.hasOwnProperty("username")) {
    const signInRes = await onSignIn(null, formData);
  }
  return res;
}

async function onSignIn(prevState, formData) {
  const response = await fetch(`${baseAPIURL}/auth/sign_in`, {
    cache: "no-store",
    method: "POST",
    headers: {
      accept: "application/json",
    },
    body: new URLSearchParams({
      grant_type: "",
      username: formData.get("username"),
      password: formData.get("password"),
      scope: "",
      client_id: "",
      client_secret: "",
    }),
  });

  const res = await response.json();
  if (res.hasOwnProperty("access_token")) {
    const halfHour = 30 * 60 * 1000;
    cookies().set("access_token", res.access_token, {
      secure: true,
      expires: Date.now() + halfHour,
    });
  }
  return res;
}

export { onSignUp, onSignIn };

export async function getUser() {
  const accessToken = cookies().get("access_token");

  if (!accessToken) {
    return null;
  }

  const response = await fetch("http://127.0.0.1:8000/auth/me", {
    cache: "no-store",
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken.value}`,
    },
  });

  if (response.status === 200) {
    const userData = await response.json();
    return userData;
  }

  return null;
}