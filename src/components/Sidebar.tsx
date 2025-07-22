import Link from "next/link";
import { Home, Lightbulb, ArchiveRestore, ShieldUser } from "lucide-react";

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
    {
      id: 4,
      title: "เข้าสู่ระบบ Admin",
      url: "/page/Admin",
      icon: ShieldUser,
      isActive: false,
    },
  ],
};

export default function Sidebar() {
  return (
    <aside className="bg-gray-400 w-64 h-full pt-2 border-r">
      <ul >
        {items.item.map((item) => (
          <li key={item.id} className="py-2 px-2 hover:bg-gray-600">
            <a href={`${item.url}`} className="flex items-center">
              {<item.icon />}
              <span className="ml-2">{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
