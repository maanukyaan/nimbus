import { defaultTypeIcons, fileIconMap, typeMap } from "@/constants/typeMap";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: unknown) => {
  return JSON.parse(JSON.stringify(value));
};

export const getFileType = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase() || "";
  const type = getTypeFromExtension(extension);
  return { type, extension };
};

const getTypeFromExtension = (extension: string): string => {
  for (const [type, extensions] of Object.entries(typeMap)) {
    if (extensions.includes(extension)) {
      return type;
    }
  }

  return "other";
};

export const getFileIcon = (extension: string | undefined, type: FileType) => {
  if (!extension) {
    return defaultTypeIcons[type || "other"];
  }

  if (extension in fileIconMap) {
    return fileIconMap[extension];
  }

  return defaultTypeIcons[type || "other"];
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

// Construct appwrite file URL - https://appwrite.io/docs/apis/rest#images
export const constructFileUrl = (bucketFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
};

export const constructDownloadUrl = (bucketFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/download?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
};
