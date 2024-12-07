export const dynamic = "force-dynamic";

import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
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
          <Header userId={currentUser.$id} accountId={currentUser.accountId} />

          <div className="main-content">{children}</div>
        </section>

        <Toaster />
      </main>
    );
  } catch (error) {
    console.error(error);
    return redirect("/sign_up");
  }
}
