"use client"

import { useFormState } from 'react-dom'
import { onSignUp } from '../actions';

export default function SignUp() {

	const [state, formAction] = useFormState(onSignUp, null)

	return (
		<div className="h-screen w-full backdrop-blur flex justify-center items-center">
			<div className="h-96 w-80 bg-white flex flex-col items-stretch justify-around border rounded p-10">
				<p className="pb-4 border-b">Sign Up</p>
				<form
					action={formAction}
					className="flex flex-col gap-4 child:border child:px-4 child:py-2 child:rounded"
				>
					<input type="text" name="username" placeholder="Username" />
					<input type="email" name="email" placeholder="E-mail" />
					<input type="password" name="password" placeholder="Password" />
					<button type="submit">Sign Up</button>
				</form>
			</div>
		</div>
	);
}
