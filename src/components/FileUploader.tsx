"use client";

import { MAX_FILE_SIZE } from "@/constants/MAX_FILE_SIZE";
import { useToast } from "@/hooks/use-toast";
import { uploadFile } from "@/lib/actions/file.action";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MouseEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Thumbnail from "./Thumbnail";
import { Button } from "./ui/button";

interface IFileUploaderProps {
  ownerId: string;
  accountId: string;
  className?: string;
}

export default function FileUploader({
  ownerId,
  accountId,
  className,
}: IFileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const path = usePathname();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      const uploadPromises = acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
          return toast({
            description: (
              <p className="body-2 text-white">
                Файл <span className="font-semibold">{file.name}</span> слишком
                большой Максимальный размер файла составляет{" "}
                {MAX_FILE_SIZE / 1024 / 1024} МБ.
              </p>
            ),
            className: "error-toast",
          });
        }

        return uploadFile({
          file,
          ownerId,
          accountId,
          path,
        }).then((uploadedFile) => {
          if (uploadedFile) {
            setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
          }
        });
      });

      await Promise.all(uploadPromises);
    },
    [ownerId, accountId, path],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (e: MouseEvent<HTMLImageElement>, file: File) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />

      <Button type="button" className={cn("uploader-button", className)}>
        <Image src="/icons/upload.svg" alt="Upload" width={24} height={24} />
        <span>Загрузить в облако</span>
      </Button>

      {files.length > 0 && (
        <ul className="uploader-preview-list">
          <h4 className="h4 text-light-100">Загрузка...</h4>

          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);
            return (
              <li
                key={`${file.name}-${index}`}
                className="uploader-preview-item"
              >
                <div className="flex items-center gap-3">
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)}
                  />

                  <div className="preview-item-name">
                    {file.name}
                    <Image
                      src="/icons/file-loader.gif"
                      width={80}
                      height={26}
                      alt="Loader"
                      unoptimized
                    />
                  </div>
                </div>

                <Image
                  src="/icons/remove.svg"
                  width={24}
                  height={24}
                  alt="Remove"
                  onClick={(e) => handleRemoveFile(e, file)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
