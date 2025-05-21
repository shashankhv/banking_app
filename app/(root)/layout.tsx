import { getLoggedInUser } from "@/lib/actions/user.actions";
import MobileNav from "../../components/MobileNav";
import Sidebar from "../../components/Sidebar";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getLoggedInUser();
  if (!user) redirect("/sign-in");
  const loggedIn = {
    firstName: user?.name.split(" ")[0],
    lastName: user?.name.split(" ")[1],
    email: user?.email,
  };
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn} />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image
            src={"/icons/logo.svg"}
            width={30}
            height={30}
            alt="menu icon"
          ></Image>
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
