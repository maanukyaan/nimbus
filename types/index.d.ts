/* eslint-disable no-unused-vars */

declare type FileType =
  | "document"
  | "image"
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
