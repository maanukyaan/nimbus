export const typeTranslations: Record<string, string> = {
  documents: "Документы",
  images: "Изображения",
  media: "Медиа",
  others: "Другое",
};

export const getTypeTranslation = (type: string): string => {
  return typeTranslations[type] || type;
};
