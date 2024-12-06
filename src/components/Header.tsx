import Image from "next/image";
import FileUploader from "./FileUploader";
import Search from "./Search";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="header">
      <Search />

      <div className="header-wrapper">
        <FileUploader />
        <form>
          <Button type="submit" className="sign-out-button">
            <Image
              src="/icons/logout.svg"
              alt="Logo"
              width={24}
              height={24}
              className="w-6"
            />
          </Button>
        </form>
      </div>
    </header>
  );
}
