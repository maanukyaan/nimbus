import FileUploader from "./FileUploader";
import Search from "./Search";
import LogoutButton from "./ui/LogoutButton";

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
