"use client";
// components
import AuthForm from "@/components/AuthForm";

export default function page() {

    // สร้างฟังก์ชันสำหรับการจัดการการส่งข้อมูลฟอร์ม สำหรับ register
    const handleRegisterSubmit = (formData : any) => {
        
    }
  return (
    <div>
      <AuthForm
        type="register"
        onsubmit={(formData) => console.log(formData)}
      />
    </div>
  );
}
