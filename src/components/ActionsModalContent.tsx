import { convertFileSize, formatDateTime } from "@/lib/utils";
import { Models } from "node-appwrite";
import FormattedDateTime from "./FormattedDateTime";
import Thumbnail from "./Thumbnail";

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
      <p className="file-details-value text-left">{value}</p>
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
