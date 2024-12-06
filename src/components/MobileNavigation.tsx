"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/constants/navItems";
import { signOutUser } from "@/lib/actions/user.actions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import FileUploader from "./FileUploader";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface IMobileNavigationProps {
  ownerId: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

export default function MobileNavigation({
  ownerId,
  accountId,
  fullName,
  avatar,
  email,
}: IMobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="mobile-header">
      <Image
        src="/icons/logo-long.svg"
        alt="Logo"
        width={512}
        height={188}
        className="h-7 w-auto"
        quality={100}
      />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image src="/icons/menu.svg" alt="Menu" width={30} height={30} />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetHeader>
            <SheetTitle>
              <div className="header-user">
                <Image
                  src={avatar}
                  height={44}
                  width={44}
                  alt="Avatar"
                  className="header-user-avatar"
                />

                <div className="flex flex-col items-start sm:hidden lg:block">
                  <p className="subtitl-2 capitalize">{fullName}</p>
                  <p className="caption">{email}</p>
                </div>
              </div>
              <Separator className="mb-4 bg-light-200/20" />
            </SheetTitle>
          </SheetHeader>

          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map(({ url, name, icon }) => {
                return (
                  <li key={name} className="lg:w-full">
                    <Link
                      href={url}
                      className={cn(
                        "mobile-nav-item",
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
                      <p>{name}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Separator className="my-4 bg-light-200/20" />

          <div className="flex flex-col justify-between gap-5 pb-5">
            <FileUploader />

            <Button
              className="mobile-sign-out-button"
              onClick={async () => await signOutUser()}
            >
              <Image
                src="/icons/logout.svg"
                alt="Logo"
                width={24}
                height={24}
              />
              <p>Выйти из аккаунта</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
