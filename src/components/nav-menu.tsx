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

import { SidebarTrigger } from "@/components/ui/sidebar";

export function NavMenu({
  items,
}: {
  items: {
    id: number;
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  console.log(items);
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xl ">
        เมนู
        <div className="static">
          <SidebarTrigger className="absolute right-0 top-2" />
        </div>
      </SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => (
          // Collapsible ทำให้ เมนูพับได้
          <Collapsible
            key={item.id}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title} asChild>
                  <a href={item.url} className="flex items-center">
                    {item.icon && <item.icon className="mr-2" />}
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
