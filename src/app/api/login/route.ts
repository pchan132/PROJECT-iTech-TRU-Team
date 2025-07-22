import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { use } from "react";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // ตรวจสอบข้อมูลที่ได้รับ
    if (!username || !password) {
      return NextResponse.json(
        { error: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน" },
        { status: 400 }
      );
    }

    // ค้นหาผู้ใช้ในฐานข้อมูล
    const user = await prisma.member.findUnique({
      where: { Username: username } as any, // ใช้ as any เพื่อหลีกเลี่ยงปัญหาการตรวจสอบประเภท
    });

    // ตรวจสอบว่าพบผู้ใช้หรือไม่
    if (!user) {
      return NextResponse.json(
        { error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
    }

    // ตรวจสอบรหัสผ่าน (สมมติว่ารหัสผ่านถูกเก็บเป็นข้อความธรรมดา)
    if (user.Password !== password) {
      return NextResponse.json(
        { error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
    }
    // หากเข้าสู่ระบบสำเร็จ ส่งข้อมูลผู้ใช้กลับ
    return NextResponse.json(
      {
        message: "Login ok",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
