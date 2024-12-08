import FileUploader from "./FileUploader";
import LogoutButton from "./LogoutButton";
import Search from "./Search";

export default function Header({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) {
  return (
    <header className="header">
      <Search />

      <div className="header-wrapper">
        <FileUploader ownerId={userId} accountId={accountId} />
        <LogoutButton />
      </div>
    </header>
  );
}
