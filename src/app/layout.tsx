import "@/assets/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { inter, unbounded } from "@/config/fonts";

import { metaData, viewPort } from "@/config/meta";
export const metadata = metaData;
export const viewport = viewPort;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.variable} ${unbounded.variable} font-inter antialiased`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
