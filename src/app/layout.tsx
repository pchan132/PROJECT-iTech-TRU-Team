import type { Metadata } from "next";
import { cookies } from "next/headers";

// import CSS
import "@/app/globals.css";

// Sidebar components
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

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
      <body className="h-screen">
        {/* ครอบ Sidebar + Main ด้วย flex */}
        <div className="flex h-full">
          <SidebarProvider defaultOpen={defaultOpen} className="m-2">
            <AppSidebar />
            <div>
              {/* เนื้อหาหลักของแอปพลิเคชัน */}
              <main className="w-screen h-screen flex flex-col items-center gap-2">
                {children}
              </main>
            </div>
          </SidebarProvider>
        </div>
      </body>
    </html>
  );
}
