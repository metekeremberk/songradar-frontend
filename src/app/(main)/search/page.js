"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchWord = searchParams.get("query")?.toString();

  function handleChange(e) {
    const params = new URLSearchParams(searchParams);
    const query = e.target.value;

    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="flex h-14 w-auto items-center border-b border-zinc-800 bg-zinc-900 pl-10">
        <Search className="absolute ml-2" size={20} />
        <input
          type="text"
          name="search"
          className="min-w-[400px] rounded-2xl border border-zinc-800 bg-zinc-950 py-2 pl-8 pr-4 text-sm text-zinc-200"
          placeholder="Search"
          defaultValue={searchParams.get("query")?.toString()}
          onChange={handleChange}
        />
      </div>
      {searchWord !== undefined && <p>{searchWord}</p>}
      {searchWord === undefined && <p>Empty</p>}
    </div>
  );
}
