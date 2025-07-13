"use client";
import TableData from "@/components/TableData";
import { useState, useEffect } from "react";

export default function page() {
  const [innovations, setInnovations] = useState([]);

  // fetch ข้อมูล innovetion
  const fetchInnovetions = async () => {
    try {
      const response = await fetch(`/api/research`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setInnovations(data);
    } catch (error) {
      console.error("Error fetching innovations:", error);
    }
  };

  // ดึงข้อมูลสิ่งประดิษฐ์และนวัจกรรมเมื่อคอมโพเนนต์ถูกเรนเดอร์
  useEffect(() => {
    fetchInnovetions();
  }, []);

  return (
    <div className="flex items-center justify-center px-4 py-8 flex-col">
      <div className="">
        <TableData data={innovations} fetchData={fetchInnovetions} />
      </div>
    </div>
  );
}
