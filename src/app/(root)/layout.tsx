import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    const currentUser = await getCurrentUser();

    return (
      <main className="flex h-screen">
        <div className="flex"></div>

        <Sidebar {...currentUser} />

        <section className="flex h-full flex-1 flex-col">
          <MobileNavigation {...currentUser} />
          <Header />

          <div className="main-content">{children}</div>
        </section>
      </main>
    );
  } catch (error) {
    return redirect("/sign_in");
  }
}
