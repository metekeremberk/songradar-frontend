"use client";

export default function SignUp() {
	async function onSubmit(event) {
		event.preventDefault();

		const formData = new FormData(event.target);
		var object = {};
		formData.forEach((value, key) => (object[key] = value));
		const json = JSON.stringify(object);
		console.log(object);

		const response = await fetch("http://127.0.0.1:8000/auth/sign_in", {
			method: "POST",
			headers: {
				"accept": "application/json",
			},
			body: formData,
			mode: "no-cors",
		});

		// Handle response if necessary
		const data = await response.json();
		// ...
	}

	return (
		<div className="h-screen w-full backdrop-blur flex justify-center items-center">
			<div className="h-96 w-80 bg-white flex flex-col items-stretch justify-around border rounded p-10">
				<p className="pb-4 border-b">Sign In</p>
				<form
					onSubmit={onSubmit}
					className="flex flex-col gap-4 child:border child:px-4 child:py-2 child:rounded"
				>
					<input type="text" name="username" placeholder="Username" />
					<input type="password" name="password" placeholder="Password" />
					<button type="submit">Sign In</button>
				</form>
			</div>
		</div>
	);
}
