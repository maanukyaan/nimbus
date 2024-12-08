"use client";

import { signOutUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { Button } from "./ui/button";

export default function LogoutButton() {
  return (
    <Button
      type="submit"
      className="sign-out-button"
      onClick={async () => await signOutUser()}
    >
      <Image
        src="/icons/logout.svg"
        alt="Logo"
        width={24}
        height={24}
        className="w-6"
      />
    </Button>
  );
}
