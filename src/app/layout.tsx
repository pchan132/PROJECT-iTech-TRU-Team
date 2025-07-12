import type { Metadata } from "next";
import { cookies } from "next/headers";

// import CSS
import "@/app/globals.css";

// Sidebar components
import Sidebar from "@/components/sidebar";
// nav
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "คลังสิ่งประดิษฐ์",
  description: "สิ่งประดิษฐ์ของนักศึกษา iTech TRU",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // เก็บการตั้งค่า Sidebar จากคุกกี้
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {/* Navbar ด้านบน */}
        <div className="w-full mb-5">
          <Header />
        </div>
        {/* Layout หลัก: ซ้าย Sidebar / ขวา Content */}
        <div className="flex">
          {/* Sidebar ซ้าย */}
          <aside className="min-h-screen w-64">
            <Sidebar />
          </aside>

          {/* Content ขวา */}
          <main className="flex-1 p-6 border-2 bg-amber-300">{children}</main>
        </div>
      </body>
    </html>
  );
}
