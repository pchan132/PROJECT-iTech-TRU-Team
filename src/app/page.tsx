"use client";
import { useState, useEffect } from "react";

// Component
import Card from "@/components/Card";

// กำหนด Type ของข้อมูล
type dataInnovation = {
  id: string;
  artifact_name: string;
  title: string;
  first_name: string;
  last_name: string;
  description: string;
  external_link: string;
  image_filename: string;
  pdf_filename: string;
};

export default function Home() {
  const [data, setData] = useState<dataInnovation[]>([]);

  // ดึงข้อมูล
  const fetchData = async () => {
    try {
      const res = await fetch(`/api/research`);
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log("มีปัญหาการดึงข้อมูล : ", error);
    }
  };

  // เมื่อเข้าหน้าเว็บให้โหลดข้อมูล
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="border-2 h-full border-gray-500 rounded-2xl">
      {/* Card ที่อยู่ใน Component  จัดตำแหน่ง*/}
      <div className="grid gap-1 md:grid-cols-4 sm:grid-cols-2 justify-items-center py-2 ">
        {/* ข้อมูล ใน data */}
        {data.map((item) => (
          <Card {...item} />
        ))}
      </div>
    </div>
  );
}
