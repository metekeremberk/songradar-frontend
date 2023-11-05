import SignOutButton from "./SignOutButton";

export default function Profile({ currentUser }) {
	return (
		<div className="h-96 w-80 bg-white flex flex-col items-center justify-around p-10">
			Profile
			<div className="flex flex-col items-center">
				<div>{currentUser.email}</div>
				<div>{currentUser.username}</div>
				<SignOutButton />
			</div>
		</div>
	);
}
