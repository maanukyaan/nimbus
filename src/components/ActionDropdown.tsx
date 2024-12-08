"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { actionsDropdownItems } from "@/config/actionDropdownItems";
import { constructDownloadUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Models } from "node-appwrite";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ActionDropdown({ file }: { file: Models.Document }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [fileName, setFileName] = useState(file.name);
  const [isLoading, setIsLoading] = useState(false);

  const handleDropdownMenuItemClick = (actionItem: ActionType) => {
    setAction(actionItem);

    if (["rename", "share", "delete", "details"].includes(actionItem.value)) {
      setIsModalOpen(true);
    }
  };

  const closeAll = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setFileName(file.name);
    setAction(null);
    setIsLoading(false);
    // setEmails([]);
  };

  const handleAction = async () => {};

  const renderDialogContent = () => {
    if (!action) return null;

    const { value, label } = action;

    return (
      <DialogContent className="shad-dialog button">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-light-100">
            {label}
          </DialogTitle>

          {value === "rename" && (
            <Input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          )}
        </DialogHeader>
        {["rename", "delete", "share"].includes(value) && (
          <DialogFooter className="flex flex-col gap-3 md:flex-row">
            <Button onClick={closeAll} className="modal-cancel-button">
              Отменить
            </Button>
            <Button onClick={handleAction} className="modal-submit-button">
              <p className="capitalize">{label}</p>
              {isLoading && (
                <Image
                  src="/icons/loader.svg"
                  alt="Loader"
                  width={15}
                  height={15}
                  className="animate-spin"
                />
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="shad-no-focus">
          <Image src="/icons/dots.svg" alt="Dots" width={25} height={25} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="max-w-52 truncate">
            {file.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem
              key={actionItem.value}
              className="shad-dropdown-item"
              onClick={() => handleDropdownMenuItemClick(actionItem)}
            >
              {actionItem.value === "download" ? (
                <Link
                  href={constructDownloadUrl(file.bucketFileId)}
                  download={file.name}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={30}
                    height={30}
                  />
                  {actionItem.label}
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Image
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={30}
                    height={30}
                  />
                  {actionItem.label}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {isModalOpen && renderDialogContent()}
    </Dialog>
  );
}