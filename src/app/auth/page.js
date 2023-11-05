import getUser from "@/lib/auth";
import { Profile, AuthMenu } from "@/components/authComponent";

export default async function AuthPage() {
	const currentUser = await getUser();

	return (
		<div className="h-screen w-full backdrop-blur flex justify-center items-center child:border child:rounded">
			{currentUser === null ? (
				<AuthMenu />
			) : (
				<Profile currentUser={currentUser} />
			)}
		</div>
	);
}
