"use client";

import { navItems } from "@/constants/navItems";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ISidebarProps {
  fullName: string;
  email: string;
  avatar: string;
}

export default function Sidebar({ fullName, email, avatar }: ISidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <Link href="/">
        <Image
          src="/icons/logo-long.svg"
          alt="Logo"
          width={512}
          height={188}
          className="hidden h-auto lg:block"
          quality={100}
        />

        <Image
          src="/icons/logo.svg"
          width={256}
          height={332}
          className="size-16 lg:hidden"
          quality={100}
          priority
          alt="Logo"
        />
      </Link>

      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => {
            return (
              <li key={name} className="lg:w-full">
                <Link
                  href={url}
                  className={cn(
                    "sidebar-nav-item",
                    pathname === url && "shad-active",
                  )}
                >
                  <Image
                    src={icon}
                    width={24}
                    height={24}
                    alt={name}
                    className={cn(
                      "nav-icon",
                      pathname === url && "nav-icon-active",
                    )}
                  />
                  <p className="hidden lg:block">{name}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Image
        src="/images/files-2.png"
        alt="Files"
        width={506}
        height={418}
        className="h-auto w-full"
      />

      <div className="sidebar-user-info">
        <Image
          src={avatar}
          alt="Avatar"
          width={44}
          height={44}
          className="sidebar-user-avatar bg-amber-200"
        />

        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize">{fullName}</p>
          <p className="caption">{email}</p>
        </div>
      </div>
    </aside>
  );
}
