import Sort from "@/components/Sort";
import { getTypeTranslation } from "@/config/translations";
import { getFiles } from "@/lib/actions/file.action";
import { Models } from "node-appwrite";

export default async function page({ params }: SearchParamProps) {
  const type = ((await params)?.type as string) || "";
  const translatedType = getTypeTranslation(type);

  const files = await getFiles();

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 font-unbounded capitalize">{translatedType}</h1>

        <div className="total-size-section">
          <p className="body-1">
            Занимаемое место: <span className="h5">12 МБ</span>
          </p>

          <div className="sort-container">
            <p className="body-1 hidden text-light-200 sm:block">
              Сортировать по:
            </p>
            <Sort />
          </div>
        </div>
      </section>

      {/* Files rendering */}
      {files.total > 0 ? (
        <section className="file-list">
          {files.documents.map((file: Models.Document) => (
            <p className="h1" key={file.$id}>
              {file.name}
            </p>
          ))}
        </section>
      ) : (
        <p className="empty-list">Нет файлов</p>
      )}
    </div>
  );
}
