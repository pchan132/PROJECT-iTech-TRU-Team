"use client";

import React, { useState } from "react";
import { Lock, Mail, Eye, EyeOff, User, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

// LoginForm Component
// ใช้สำหรับการเข้าสู่ระบบของผู้ดูแลระบบ

export default function LoginForm() {
  const router = useRouter(); // ใช้สำหรับการเปลี่ยนเส้นทางหลังจากเข้าสู่ระบบสำเร็จ
  // สถานะของฟอร์ม
  // ใช้สำหรับเก็บข้อมูลที่กรอกในฟอร์ม
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // สถานะสำหรับการแสดง/ซ่อนรหัสผ่าน และการโหลด
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // ดึงชื่อและค่าจาก input
    // อัพเดตสถานะของ formData ตามข้อมูลที่กรอก
    // ใช้การ spread operator เพื่อคงค่าที่มีอยู่เดิมและอัพเดตเฉพาะค่าที่เปลี่ยนแปลง
    setFormData((prev) => ({
      ...prev, // คงค่าที่มีอยู่เดิม
      [name]: value, // อัพเดตค่าที่เปลี่ยนแปลง
    }));
  };

  // ฟังก์ชันสำหรับจัดการการส่งฟอร์ม
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าเมื่อส่งฟอร์ม
    setIsLoading(true); // ตั้งค่าสถานะการโหลดเป็น true

    // Simulate API call // 
    setTimeout(() => {
      setIsLoading(false);
      // console.log("Login attempted with:", formData); // แสดงข้อมูลที่กรอกในฟอร์ม
    }, 2000);

    // ส่งข้อมูลเข้าสู่ระบบไปยัง API
    // ใช้ fetch API เพื่อส่งข้อมูลเข้าสู่ระบบไปยัง API ที่กำหนด
    try {
      // ส่งข้อมูลเข้าสู่ระบบไปยัง API หรือจัดการตามที่ต้องการ
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        throw new Error("Login failed");
      }

      // หากเข้าสู่ระบบสำเร็จ
      const data = await res.json();
      console.log("Login successful from API:", data); // แสดงข้อมูลที่ได้รับจาก API
      alert("เข้าสู่ระบบสำเร็จ");
      // ทำการเปลี่ยนเส้นทางหรือจัดการต่อไปตามที่ต้องการ
      router.push("/admin/management");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header Section */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            เข้าสู่ระบบผู้ดูแล
          </h1>
          <p className="text-gray-600">กรุณาเข้าสู่ระบบเพื่อจัดการข้อมูล</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="Username"
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pl-11 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-500"
                  placeholder="กรอกชื่อผู้ใช้ของคุณ"
                  required
                />
                <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                รหัสผ่าน
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pl-11 pr-11 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-500"
                  placeholder="กรอกรหัสผ่านของคุณ"
                  required
                />
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            {/* <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  จดจำการเข้าสู่ระบบ
                </span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
              >
                ลืมรหัสผ่าน?
              </button>
            </div> */}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  กำลังเข้าสู่ระบบ...
                </div>
              ) : (
                "เข้าสู่ระบบ"
              )}
            </button>
          </form>

          {/* Footer */}
          {/* <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              ยังไม่มีบัญชี?{" "}
              <button className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
                สมัครสมาชิก
              </button>
            </p>
          </div> */}
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            ข้อมูลของคุณได้รับการปกป้องด้วยระบบความปลอดภัยระดับสูง
          </p>
        </div>
      </div>
    </div>
  );
}
