"use server"

import { baseAPIURL } from "../config";

async function onSignUp(prevState, formData) {
    const response = await fetch(`${baseAPIURL}/auth/sign_up`, {
        cache: "no-store",
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': formData.get("username"),
            'email': formData.get("email"),
            'password': formData.get("password")
        })
    });
    console.log(await response.json())
}

async function onSignIn(prevState, formData) {
    const response = await fetch(`${baseAPIURL}/auth/sign_in`, {
        method: 'POST',
        headers: {
            'accept': 'application/json'
        },
        body: new URLSearchParams({
            'grant_type': '',
            'username': formData.get("username"),
            'password': formData.get("password"),
            'scope': '',
            'client_id': '',
            'client_secret': ''
        })
    });
    console.log(await response.json())
}

export { onSignUp, onSignIn }