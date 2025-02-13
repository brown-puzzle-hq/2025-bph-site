import "~/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import AdminHamburgerMenu from "./AdminHamburgerMenu";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <body className="bg-white">
      <AdminHamburgerMenu />
      <main className="flex min-h-[calc(100vh-56px)] pt-6">{children}</main>
      <div className="min-h-[56px]"></div>
      <Toaster />
    </body>
  );
}
