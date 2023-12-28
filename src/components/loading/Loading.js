import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex w-full items-center justify-center py-2">
      <Loader2 className="animate-spin" size={30} />
    </div>
  );
}
