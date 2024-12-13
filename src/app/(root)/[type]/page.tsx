import Card from "@/components/Card";
import Sort from "@/components/Sort";
import { getTypeTranslation } from "@/config/translations";
import { getFiles } from "@/lib/actions/file.action";
import { convertFileSize, getFileTypesParams } from "@/lib/utils";
import { Models } from "node-appwrite";

export default async function page({ searchParams, params }: SearchParamProps) {
  const type = ((await params)?.type as string) || "";
  const query = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";
  const limit = ((await searchParams)?.limit as string) || "50";

  const files = await getFiles({
    types: getFileTypesParams(type),
    query,
    sort,
    limit: parseInt(limit),
  });

  const totalSize = files.documents.reduce(
    (acc: number, file: Models.Document) => acc + file.size,
    0,
  );

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 font-unbounded capitalize">
          {getTypeTranslation(type)}
        </h1>

        {files.documents.length > 0 && (
          <div className="total-size-section">
            <p className="body-1">
              Занимаемое место:{" "}
              <span className="h5">{convertFileSize(totalSize)}</span>
            </p>

            <div className="sort-container">
              <p className="body-1 hidden text-light-200 sm:block">
                Сортировать по:
              </p>
              <Sort />
            </div>
          </div>
        )}
      </section>

      {/* Files rendering */}
      {files.total > 0 ? (
        <section className="file-list">
          {files.documents.map((file: Models.Document) => (
          <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">Здесь пусто :(</p>
      )}
    </div>
  );
}
