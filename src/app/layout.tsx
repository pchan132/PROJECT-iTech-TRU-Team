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
        <Header />
        {/* ส่วน Layout หลัก: Sidebar + เนื้อหา */}
        <div className="flex border-2 pt-17">
          {/* <Sidebar /> */}
          <aside>
            <Sidebar />
          </aside>
          {/* เนื้อหาหลักของแอปพลิเคชัน */}
          <main className="flex-1 h-screen overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
