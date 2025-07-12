"use client";
import { Home, Lightbulb, ArchiveRestore } from "lucide-react";

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
export default function Sidebar() {
  return (
    <>
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700">
        {/* Sidebar content */}
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {items.item.map((item) => (
              <li key={item.id}>
                <a
                  href={item.url}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    {<item.icon className="mr-2"></item.icon>}
                  </svg>
                  <span className="ms-3">{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
