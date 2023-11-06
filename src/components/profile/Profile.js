import SignOutButton from "./SignOutButton";
import UserInfo from "./UserInfo";
import CloseButton from "./CloseButton";

export default function Profile() {
  return (
    <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-slate-400 bg-opacity-50 shadow backdrop-blur-sm">
      <div className="relative flex h-96 w-1/3 flex-col items-center justify-around rounded border bg-white pt-16">
        <CloseButton />
        <div className="absolute left-0 top-0 w-full border-b py-5 pl-10">
          Account
        </div>
        <div className="flex h-full w-full flex-col items-center justify-around px-10">
          <UserInfo />
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
