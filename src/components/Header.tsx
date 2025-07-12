"use client";

import { useState } from "react";

// กำหนด type ที่รับเข้าผ่าน props
export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <>
      <nav className="bg-red-600 fixed top-0 z-50 w-full" >
        {/* กล่องที่ 1 */}
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          {/* กล่องที่ 2 นี้ คุม ส่วนของ Header*/}
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-start rtl:justify-end">
              {/* กล่องทางซ้าย LOGO และข้อความ*/}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  {/* LOGO วงกลม 3 จุด */}
                  <div className="text-red-600 font-bold">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      className="text-red-600"
                    >
                      <circle cx="16" cy="8" r="6" fill="currentColor" />
                      <circle cx="8" cy="20" r="6" fill="green" />
                      <circle cx="24" cy="20" r="6" fill="blue" />
                    </svg>
                  </div>
                </div>{" "}
                {/* ข้อความ */}
                <div className="text-white ml-2">
                  <h1 className="text-lg font-bold">
                    สิ่งประดิษฐ์และนวัตกรรมคณะเทคโนโลยีอุตสาหกรรม
                  </h1>
                  <p className="text-sm opacity-90">
                    Inventions and Innovations Faculty of Industrial Technology
                  </p>
                </div>
                {/* กล่องฝั่ง ขวา */}
                <div className="ml-20">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
