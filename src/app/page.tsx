"use client";
import { useEffect, useState } from "react";

// import component
import InnovationCard from "@/components/InnovationCard";

type innovation = {
  ArtifactName: string;
  Title: string;
  FirstName: string;
  LastName: string;
  Description: string;
  ExternalLink: string;
  ImageFile: string;
  AttachedPDF: string;
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
      <div className="flex">
        {innovations.map((innovation) => (
          <InnovationCard {...innovation}></InnovationCard>
        ))}
      </div>
    </div>
  );
}
