export const typeMap: Record<string, string[]> = {
  image: ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"],
  audio: [
    "mp3",
    "wav",
    "ogg",
    "flac",
    "m4a",
    "aac",
    "wma",
    "aiff",
    "alac",
    "mpeg",
  ],
  video: ["mp4", "webm", "avi", "mov", "mkv", "flv", "m4v", "3gp", "wmv"],
  document: [
    "doc",
    "docx",
    "pdf",
    "txt",
    "rtf",
    "odt",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "csv",
  ],
  archive: ["zip", "rar", "7z", "tar", "gz"],
  code: ["js", "ts", "py", "html", "css", "json", "xml"],
};

export const fileIconMap: Record<string, string> = {
  pdf: "/icons/file-pdf.svg",
  doc: "/icons/file-doc.svg",
  docx: "/icons/file-docx.svg",
  csv: "/icons/file-csv.svg",
  txt: "/icons/file-txt.svg",
  xls: "/icons/file-document.svg",
  xlsx: "/icons/file-document.svg",
  svg: "/icons/file-image.svg",
};

export const defaultTypeIcons: Record<string, string> = {
  image: "/icons/file-image.svg",
  document: "/icons/file-document.svg",
  video: "/icons/file-video.svg",
  audio: "/icons/file-audio.svg",
  other: "/icons/file-other.svg",
};
