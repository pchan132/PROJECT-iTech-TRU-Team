"use client";

import * as React from "react";
import { Home, Lightbulb, ArchiveRestore } from "lucide-react";

import { NavMenu } from "@/components/nav-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Title } from "@radix-ui/react-dialog";
import { url } from "inspector";

// ข้อมูลให้กดใน sidebar
const items = {
  item: [
    {
      id: 1,
      title: "หน้าหลัก",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      id: 2,
      title: "สิ่งประดิษฐ์",
      url: "/innovation",
      icon: Lightbulb,
      isActive: false,
    },
    {
      id: 3,
      title: "แบบสำรวจ",
      url: "/research",
      icon: ArchiveRestore,
      isActive: false,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    // Collapsiblble ทำให้พับแล้ว แสดง icon
    <Sidebar collapsible="icon" {...props}>
      <SidebarRail /> {/* // ทำให้กดได้ที่เส้นแบ่ง */}
      <SidebarContent>
        <NavMenu items={items.item}></NavMenu>
      </SidebarContent>
    </Sidebar>
  );
}
