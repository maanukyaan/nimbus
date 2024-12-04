import { Metadata, Viewport } from "next";

export const metaData: Metadata = {
  authors: [{ name: "Vahe Manukyan", url: "https://whoiskenshi.t.me" }],
  title: "Nimbus — облачное хранилище для ваших файлов",
  icons: "/icons/logo.svg",
  description:
    "Nimbus — удобное, надежное и быстрое облачное хранилище для ваших файлов.",
  openGraph: {
    siteName: "Nimbus",
    title: "Nimbus — облачное хранилище для ваших файлов",
    description:
      "Nimbus — ваше безопасное облачное пространство для хранения данных. Загружайте, синхронизируйте и управляйте файлами легко и быстро.",
    url: "https://nimbus.app",
    images: "/icons/logo.svg",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewPort: Viewport = {
  themeColor: "#101010",
};
