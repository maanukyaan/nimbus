import { convertFileSize, formatDateTime } from "@/lib/utils";
import Image from "next/image";
import { Models } from "node-appwrite";
import { Dispatch, SetStateAction } from "react";
import FormattedDateTime from "./FormattedDateTime";
import Thumbnail from "./Thumbnail";
import { Button } from "./ui/button";

const ImageThumbnail = ({ file }: { file: Models.Document }) => {
  return (
    <div className="file-details-thumbnail">
      <Thumbnail type={file.type} extension={file.extension} url={file.url} />
      <div className="flex flex-col">
        <p className="subtitle-2 mb-1">{file.name}</p>
        <FormattedDateTime date={file.$createdAt} className="caption" />
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex">
      <p className="file-details-label text-left">{label}</p>
      <p className="file-details-value truncate text-left">{value}</p>
    </div>
  );
};

export function FileDetails({ file }: { file: Models.Document }) {
  return (
    <>
      <ImageThumbnail file={file} />

      <div className="space-y-4 px-2 pt-2">
        <DetailRow label="Расширение" value={file.extension} />
        <DetailRow label="Размер" value={convertFileSize(file.size)} />
        <DetailRow label="Автор" value={file.owner.fullName} />
        <DetailRow label="Email автора" value={file.owner.email} />

        <DetailRow
          label="Дата создания"
          value={formatDateTime(file.$createdAt)}
        />
        {file.$updatedAt !== file.$createdAt && (
          <DetailRow
            label="Дата изменения"
            value={formatDateTime(file.$updatedAt)}
          />
        )}
      </div>
    </>
  );
}

interface IShareInputProps {
  file: Models.Document;
  onInputChange: Dispatch<SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

export function ShareInput({
  file,
  onInputChange,
  onRemove,
}: IShareInputProps) {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="share-wrapper">
        <p className="subtitle-2 pl-1 text-light-100">
          Поделиться файлом с другими пользователями
        </p>
        <input
          type="email"
          placeholder="Введите email"
          className="share-input-field"
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
        />
        <div className="pt-4">
          <div className="flex justify-between">
            <p className="subtitle-2 text-light-100">Вы делитесь с</p>
            <p className="subtitle-2 text-light-200">
              {file.users.length} людьми
            </p>
          </div>

          <ul className="pt-2">
            {file.users.map((email: string) => (
              <li
                key={email}
                className="flex items-center justify-between gap-2"
              >
                <p className="subtitle-2">{email}</p>
                <Button
                  onClick={() => onRemove(email)}
                  className="share-remove-user"
                >
                  <Image
                    src="/icons/remove.svg"
                    alt="Remove"
                    width={24}
                    height={24}
                    className="remove-icon"
                  />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
