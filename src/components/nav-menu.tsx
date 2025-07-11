"use client";
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarGroup,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function NavMenu({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  console.log(items);
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xl">เมนู</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          // Collapsible ทำให้ เมนูพับได้
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            {/* เมนู Sidebar */}
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                {/* asChild ทำให้ กด ลิ้งได้ ทั้งปุ่ม */}
                <SidebarMenuButton tooltip={item.title} asChild>
                  <a href={item.url} className="flex items-center">
                    {item.icon && <item.icon className="mr-2 " />}
                    <span className="text-xl">{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
