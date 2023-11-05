"use client";

import { useFormState } from "react-dom";
import { useState } from "react";
import { onSignUp, onSignIn } from "@/app/auth/actions";

function SignUp() {
	const [state, formAction] = useFormState(onSignUp, null);

	return (
		<div className="h-auto w-80 bg-white flex flex-col items-stretch justify-evenly p-10">
			<p className="mb-4 pb-4 border-b">Sign Up</p>
			<form action={formAction} className="flex flex-col gap-2">
				<div className="flex flex-col gap-2 child:border child:px-4 child:py-2 child:rounded">
					<input type="text" name="username" placeholder="Username" />
					<input type="email" name="email" placeholder="E-mail" />
					<input type="password" name="password" placeholder="Password" />
				</div>
				<p className="px-0 border-none text-red-600 text-xs">{state?.detail}</p>
				<button type="submit" className="border px-4 py-2 rounded">
					Sign Up
				</button>
			</form>
		</div>
	);
}

function SignIn() {
	const [state, formAction] = useFormState(onSignIn, null);

	const errorMessage = state?.detail;

	return (
		<div className="h-auto w-80 bg-white flex flex-col items-stretch justify-evenly p-10">
			<p className="mb-4 pb-4 border-b">Sign In</p>
			<form action={formAction} className="flex flex-col gap-2">
				<div className="flex flex-col gap-2 child:border child:px-4 child:py-2 child:rounded">
					<input type="text" name="username" placeholder="Username" />
					<input type="password" name="password" placeholder="Password" />
				</div>
				{errorMessage !== null && (
					<p className="px-0 border-none text-red-600 text-xs">
						{errorMessage}
					</p>
				)}
				<button type="submit" className="border px-4 py-2 rounded">
					Sign In
				</button>
			</form>
		</div>
	);
}

export function Profile({ currentUser }) {
	return (
		<div className="h-96 w-80 bg-white flex flex-col items-center justify-around p-10">
			Profile
			<div className="flex flex-col items-center">
				<div>{currentUser.email}</div>
				<div>{currentUser.username}</div>
			</div>
		</div>
	);
}

export function AuthMenu() {
	const [menu, setMenu] = useState("sign_in");

	return (
		<div className="flex flex-col">
			<div className="flex w-full child:basis-1/2 child:py-2 child:m-2 odd-child:mr-0 even-child:ml-0 child:rounded">
				<button
					onClick={() => {
						setMenu("sign_in");
					}}
					className={menu === "sign_in" ? "bg-slate-200" : ""}
				>
					Sign In
				</button>
				<button
					onClick={() => {
						setMenu("sign_up");
					}}
					className={menu === "sign_up" ? "bg-slate-200" : ""}
				>
					Sign Up
				</button>
			</div>
			<div className="w-11/12 border-b mx-auto" />
			<div>
				{menu === "sign_in" && <SignIn />}
				{menu === "sign_up" && <SignUp />}
			</div>
		</div>
	);
}
