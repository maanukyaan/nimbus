"use client";

import { getFiles } from "@/lib/actions/file.actions";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Models } from "node-appwrite";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import FormattedDateTime from "./FormattedDateTime";
import Thumbnail from "./Thumbnail";
import { Input } from "./ui/input";

export default function Search() {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [results, setResults] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const [debouncedQuery] = useDebounce(query, 400);

  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedQuery.length === 0) {
        setOpen(false);
        setResults([]);
        return router.push(path.replace(searchParams.toString(), ""));
      }

      const files = await getFiles({ types: [], query: debouncedQuery });
      setResults(files.documents);
      setOpen(true);
    };
    fetchFiles();
  }, [debouncedQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  const hanldeClickItem = (file: Models.Document) => {
    setOpen(false);
    setResults([]);
    router.push(
      `${file.type === "video" || file.type === "audio" ? "media" : file.type + "s"}?query=${query}`,
    );
  };

  return (
    <div className="search">
      <div className="search-input-wrapper">
        <Image src="/icons/search.svg" alt="Search" width={15} height={15} />
        <Input
          type="text"
          className="search-input"
          placeholder="Поиск"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {open && (
          <ul className="search-result">
            {results.length > 0 ? (
              results.map((file) => (
                <li
                  key={file.$id}
                  className="flex items-center justify-between"
                  onClick={() => hanldeClickItem(file)}
                >
                  <div className="flex cursor-pointer items-center gap-4">
                    <Thumbnail
                      type={file.type}
                      extension={file.extension}
                      url={file.url}
                      className="size-9 min-w-9"
                    />
                    <p className="subtitle-2 line-clamp-1 max-w-[150px] text-light-100 lg:max-w-[200px]">
                      {file.name}
                    </p>
                  </div>
                  <FormattedDateTime
                    date={file.$createdAt}
                    className="caption line-clamp-1 text-light-200"
                  />
                </li>
              ))
            ) : (
              <p className="empty-result">Ничего не найдено</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
