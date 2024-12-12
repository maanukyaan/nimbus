"use client";

import { getFiles } from "@/lib/actions/file.action";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Models } from "node-appwrite";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";

export default function Search() {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [results, setResults] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchFiles = async () => {
      const files = await getFiles({ query });
      setResults(files.documents);
      setOpen(true);
    };
    fetchFiles();
  }, [query]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

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
                <li key={file.$id}>
                  <Link href={`/files/${file.id}`}>{file.name}</Link>
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
