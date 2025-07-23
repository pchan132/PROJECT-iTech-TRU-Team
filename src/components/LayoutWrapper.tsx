"use client";

// ใช้จะหน้าเว็บ

import { useState } from "react";
import { Menu } from "lucide-react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  return (
    <div className="flex flex-col h-screen ">
      {/* Navbar */}
      <div className="flex flex-row items-center justify-between px-4 bg-red-500 ">
        <Navbar />
        {/* Mobile Menu Button */}
        <div className="flex items-center justify-between bg-red-500 md:hidden">
          <button onClick={() => setIsOpenSidebar(!isOpenSidebar)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`border-r w-64 absolute md:static h-full z-50 ${
            isOpenSidebar ? "translate-x-0" : "-translate-x-75 md:translate-x-0 "
          }`}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="border flex-1 overflow-y-auto p-6 bg-white w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
