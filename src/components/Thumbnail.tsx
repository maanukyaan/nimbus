import { cn, getFileIcon } from "@/lib/utils";
import Image from "next/image";

interface IThumbnailProps {
  type: string;
  extension: string;
  url?: string;
  imageClassName?: string;
  className?: string;
}

export default function Thumbnail({
  type,
  extension,
  url = "",
  imageClassName,
  className,
}: IThumbnailProps) {
  const isImage = type === "image" && extension !== "svg";

  return (
    <figure className={cn("thumbnail", className)}>
      <Image
        src={isImage ? url : getFileIcon(extension, type)}
        width={100}
        height={100}
        className={cn(
          "size-8 object-contain",
          imageClassName,
          isImage && "thumbnail-image",
        )}
        alt="Thumbnail"
        priority
      />
    </figure>
  );
}
