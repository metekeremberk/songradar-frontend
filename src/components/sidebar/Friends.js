import { Plus, User } from "lucide-react";

export default function Friends() {
  return (
    <div className="h-full w-[200px] min-w-[200px] basis-[200px] border-l border-zinc-800 bg-zinc-900 shadow-xl">
      <div className="flex h-full w-full flex-col items-start gap-4 py-4">
        <div className="h-10 w-full cursor-default border-b border-zinc-800 px-4 opacity-80">
          Friends
        </div>
        <div className="flex w-full cursor-pointer items-center justify-start gap-4 px-4 py-2 opacity-60 transition-opacity hover:opacity-90">
          <Plus size={25} />
          <p>Add friend</p>
        </div>
        <div className="flex w-full cursor-pointer items-center justify-start gap-4 px-4 py-2 opacity-60 transition-opacity hover:opacity-90">
          <User size={25} />
          <p>Friend</p>
        </div>
        <div className="flex w-full cursor-pointer items-center justify-start gap-4 px-4 py-2 opacity-60 transition-opacity hover:opacity-90">
          <User size={25} />
          <p>Friend</p>
        </div>
        <div className="flex w-full cursor-pointer items-center justify-start gap-4 px-4 py-2 opacity-60 transition-opacity hover:opacity-90">
          <User size={25} />
          <p>Friend</p>
        </div>
        <div className="flex w-full cursor-pointer items-center justify-start gap-4 px-4 py-2 opacity-60 transition-opacity hover:opacity-90">
          <User size={25} />
          <p>Friend</p>
        </div>
      </div>
    </div>
  );
}
