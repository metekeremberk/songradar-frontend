"use client";

import { Search } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const SearchContent = dynamic(() =>
  import("@/components/search/SearchContent"),
);

export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="relative h-full w-full overflow-y-auto bg-zinc-950/70">
      <div className="sticky top-0 z-50 flex h-14 w-full items-center border-b border-zinc-800 bg-zinc-900 pl-10">
        <Search className="absolute ml-2" size={20} />
        <input type="email" name="email" style={{ display: "none" }} />
        <input type="password" name="password" style={{ display: "none" }} />
        <input
          type="search"
          name="search"
          id="search"
          className="min-w-[400px] rounded-2xl border border-zinc-800 bg-zinc-950 py-2 pl-8 pr-4 text-sm text-zinc-200"
          placeholder="Search"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>
      <SearchContent searchWord={query} />
    </div>
  );
}
