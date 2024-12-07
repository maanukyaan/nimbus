import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <section className="hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
          <Image
            src="/icons/logo.svg"
            width={64}
            height={64}
            quality={100}
            priority
            alt="Logo"
            className="brightness-0 invert filter"
          />

          <div className="space-y-7 text-white">
            <h1 className="h1 font-unbounded">
              Удобное хранилище для ваших файлов
            </h1>
            <h2 className="body-1">
              <b>Nimbus</b> — Ваше безопасное облачное пространство для хранения
              данных. Загружайте, синхронизируйте и управляйте файлами легко и
              быстро.
            </h2>

            <Image
              src="/images/files.png"
              width={342}
              height={342}
              className="transition-all hover:rotate-2 hover:scale-105"
              quality={100}
              alt="Files"
              priority
            />
          </div>
        </div>
      </section>

      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
          <Image
            src="/icons/logo-long.svg"
            alt="Logo"
            width={512}
            height={110}
            className="h-auto w-52 lg:w-[250px]"
            quality={100}
          />
        </div>

        {children}
      </section>
    </div>
  );
}
