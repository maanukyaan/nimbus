import { convertFileSize } from "@/lib/utils";
import Link from "next/link";
import { Models } from "node-appwrite";
import ActionDropdown from "./ActionDropdown";
import FormattedDateTime from "./FormattedDateTime";
import Thumbnail from "./Thumbnail";

export default function Card({ file }: { file: Models.Document }) {
  return (
    <Link
      href={file.url}
      target="_blank"
      rel="noopener noreferrer"
      className="file-card"
    >
      <div className="flex justify-between">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!size-20"
          imageClassName="!size-11"
        />

        <div className="flex flex-col items-end justify-between">
          <ActionDropdown file={file} />

          <p className="body-1">{convertFileSize(file.size)}</p>
        </div>
      </div>

      <div className="file-card-details">
        <p className="subtitle-2 line-clamp-1">{file.name}</p>
        <FormattedDateTime
          date={file.$createdAt}
          className="body-2 text-light-100"
        />
        <p className="caption line-clamp-1 text-light-200">
          Автор: {file.owner.fullName}
        </p>
      </div>
    </Link>
  );
}
