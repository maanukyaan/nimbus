import FileUploader from "./FileUploader";
import Search from "./Search";
import LogoutButton from "./ui/LogoutButton";

export default function Header() {
  return (
    <header className="header">
      <Search />

      <div className="header-wrapper">
        <FileUploader />
        <LogoutButton />
      </div>
    </header>
  );
}
