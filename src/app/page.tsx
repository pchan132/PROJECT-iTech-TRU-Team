"use client";
import { useEffect, useState } from "react";

// import component
import InnovationCard from "@/components/InnovationCard";

type innovation = {
  id : number;
  artifact_name : string;
  title : string;
  first_name : string;
  last_name : string;
  description : string;
  external_link : string;
  image_filename : string;
  pdf_filename : string;
};

export default function Home() {
  // เก็บข้อมูลสิ่งประดิษฐ์และนวัจกรรม
  const [innovations, setInnovations] = useState<innovation[]>([]);

  ///// ฟังก์ชันสำหรับดึงข้อมูลสิ่งประดิษฐ์และนวัจกรรม ///////////
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
    <div>
      {/* หน้า Card ของ นวัตกรรม */}
      <div className="flex gap-4 mt-20">
        {innovations.map((innovation) => (
          <InnovationCard {...innovation} key={innovation.id }></InnovationCard>
        ))}
      </div>
    </div>
  );
}
