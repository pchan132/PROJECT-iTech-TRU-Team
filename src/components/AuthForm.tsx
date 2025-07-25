"use client";
import { useState } from "react";

type authType = "login" | "register"; // กำหนดประเภทของการรับรองความถูกต้อง

// กำหนดรูปแบบของข้อมูลที่ส่งจากฟอร์ม
interface FormDataType {
  email: string;
  password: string;
  name?: string; // ชื่อผู้ใช้สำหรับการลงทะเบียน
}

// กำหนดคอมโพเนนต์ AuthForm
interface AuthFormProps {
  type: authType;
  onsubmit: (formData: FormDataType) => void; // ฟังก์ชันสำหรับจัดการการส่งข้อมูลฟอร์ม
}

// คอมโพเนนต์ AuthForm
// ใช้สำหรับการเข้าสู่ระบบและการลงทะเบียน
// รับค่า type และ onsubmit จาก props
export default function AuthForm({ type, onsubmit }: AuthFormProps) {
  //   เก็บสถานะของข้อมูลฟอร์ม
  const [formData, setFormData] = useState<FormDataType>({
    // กำหนดค่าเริ่มต้นของ formData
    // หากเป็นการเข้าสู่ระบบ จะไม่มีฟิลด์ name
    // หากเป็นการลงทะเบียน จะมีฟิลด์ name
    email: "",
    password: "",
    name: type === "register" ? "" : undefined, // หากเป็นการลงทะเบียน ให้มีฟิลด์ name
  });

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleChange = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // ดึงชื่อและค่าจาก input
    // อัพเดตสถานะของ formData ตามข้อมูลที่กรอก
    setFormData((prev) => ({
      ...prev, // คงค่าที่มีอยู่เดิม
      [name]: value, // อัพเดตค่าที่เปลี่ยนแปลง
    }));
  };

  // ฟังก์ชันสำหรับจัดการการส่งฟอร์ม
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าเมื่อส่งฟอร์ม

    // ตรวจสอบว่ากรอกข้อมูลครบถ้วนหรือไม่
    if (!formData.email || !formData.password) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    // ถ้าเป็น register ให้ตรวจสอบว่ามีชื่อผู้ใช้หรือไม่
    if (type === "register" && !formData.name) {
      alert("กรุณากรอกชื่อผู้ใช้");
      return;
    }

    // ทดสอบ 
    console.log("Form submitted with data:", formData);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        <h2>
            {type === "login" ? "เข้าสู่ระบบ" : "ลงทะเบียน"}
        </h2>  
    </form>
  );
}
