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
      <body>
        <SidebarProvider defaultOpen={defaultOpen} className="m-2">
          <AppSidebar />
          <main>
            <SidebarTrigger />
            <div className="contener mx-auto">
            {/* เนื้อหาหลักของแอปพลิเคชัน */}
            {children}
            </div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
