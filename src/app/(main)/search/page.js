"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import dynamic from "next/dynamic";

const SearchComponent = dynamic(() =>
  import("@/components/search/SearchContent"),
);

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
    <div className="h-full w-full overflow-y-auto">
      <div className="sticky top-0 flex h-14 w-auto items-center border-b border-zinc-800 bg-zinc-900 pl-10">
        <Search className="absolute ml-2" size={20} />
        <input type="email" name="email" style={{ display: "none" }} />
        <input type="password" name="password" style={{ display: "none" }} />
        <input
          type="search"
          name="search"
          id="search"
          className="min-w-[400px] rounded-2xl border border-zinc-800 bg-zinc-950 py-2 pl-8 pr-4 text-sm text-zinc-200"
          placeholder="Search"
          defaultValue={searchParams.get("query")?.toString()}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </div>
      <SearchComponent searchWord={searchWord} />
    </div>
  );
}
