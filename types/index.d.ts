/* eslint-disable no-unused-vars */

declare type FileType =
  | "image"
  | "document"
  | "video"
  | "audio"
  | "other"
  | string;

declare interface UploadFileProps {
  file: File;
  ownerId: string;
  accountId: string;
  path: string;
}

declare interface SearchParamProps {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

declare interface ActionType {
  label: string;
  icon: string;
  value: string;
}

declare interface RenameFileProps {
  fileId: string;
  name: string;
  extension: string;
  path: string;
}

declare interface DeleteFileProps {
  fileId: string;
  bucketFileId: string;
  path: string;
}

declare interface UpdateFileUsersProps {
  fileId: string;
  emails: string[];
  path: string;
}

declare interface GetFilesProps {
  types: FileType[];
  query?: string;
  sort?: string;
  limit?: number;
}
