import { PrismaClient } from "@prisma/client"; // นำเข้า PrismaClient จาก @prisma/client
import { NextResponse } from "next/server";
import path from "path"; // ใช้ path เพื่อจัดการกับเส้นทางไฟล์
import fs from "fs/promises"; // ใช้ fs/promises เพื่อจัดการกับไฟล์แบบ Promise

const prisma = new PrismaClient();

export async function GET(request: NextResponse) {
  try {
    const reasearchData = await prisma.research.findMany();
    return NextResponse.json(reasearchData);
  } catch (error: any) {
    console.log({
      message: error.message,
      stack: error.stack,
      function: "GET FindManny",
    });
    return NextResponse.json(
      { error: "มีปัญหาในการดึงข้อมูล" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // รับข้อมูลจาก form
    const formData = await request.formData();

    // รับข้อมูล Text และตรวจสอบค่า null
    const artifact_name = formData.get("ArtifactName") as string || "";
    const title = formData.get("Title") as string || "";
    const first_name = formData.get("FirstName") as string || "";
    const last_name = formData.get("LastName") as string || "";
    const description = formData.get("Description") as string || "";
    const external_link = formData.get("ExternalLink") as string || "";

    // Debug log เพื่อตรวจสอบข้อมูลที่ได้รับ
    console.log("Received data:", {
      artifact_name,
      title,
      first_name,
      last_name,
      description,
      external_link
    });

    // รับข้อมูลไฟล์
    const image_filename = formData.get("ImageFile") as File | null;
    const pdf_filename = formData.get("AttachedPDF") as File | null;

    // สร้างตัวแปรสำหรับสร้าง ชื่อไฟล์
    let imageFileName = null;
    let pdfFileName = null;

    // ตรวจสอบว่ามีไฟล์หรือไม่ และบันทึกไฟล์
    // หากมีไฟล์ image_filename
    if (image_filename) {
      imageFileName = `research_${Date.now()}_${image_filename.name}`; // ตั้งชื่อไฟล์ใหม่
      const imageBuffer = Buffer.from(await image_filename.arrayBuffer()); // แปลงไฟล์เป็น Buffer
      // สร้าง path สำหรับบันทึกไฟล์
      const imagePath = path.join(
        process.cwd(),
        "public",
        "uploads",
        imageFileName
      );
      // บันทึกไฟล์ลงใน path ที่กำหนด
      await fs.mkdir(path.dirname(imagePath), { recursive: true }); // สร้างโฟลเดอร์หากยังไม่มี ชื่อโฟลเดอร์ uploads
      await fs.writeFile(imagePath, imageBuffer); // บันทึกไฟล์ เป็นไฟล์รูปภาพ
    }

    // หากมีไฟล์ pdf_filename
    if (pdf_filename) {
      pdfFileName = `research_${Date.now()}_${pdf_filename.name}`; // ตั้งชื่อไฟล์ใหม่
      const pdfBuffer = Buffer.from(await pdf_filename.arrayBuffer()); // แปลงไฟล์เป็น Buffer
      // สร้าง path สำหรับบันทึกไฟล์
      const pdfPath = path.join(
        process.cwd(),
        "public",
        "uploads",
        pdfFileName
      );
      // บันทึกไฟล์ลงใน path ที่กำหนด
      await fs.mkdir(path.dirname(pdfPath), { recursive: true }); // สร้างโฟลเดอร์หากยังไม่มี ชื่อโฟลเดอร์ uploads
      await fs.writeFile(pdfPath, pdfBuffer); // บันทึกไฟล์ เป็นไฟล์ PDF
    }

    // บันทึกข้อมูลลงในฐานข้อมูล
    const newResearch = await prisma.research.create({
      data: {
        artifact_name,
        title,
        first_name,
        last_name,
        description,
        external_link,
        image_filename: imageFileName ?? "", // หากไม่มีไฟล์จะเก็บเป็นค่าว่าง
        pdf_filename: pdfFileName ?? "", // หากไม่มีไฟล์จะเก็บเป็นค่าว่าง
      },
    });

    //  ส่งข้อมูลที่สร้างใหม่กลับไป
    return NextResponse.json(newResearch, { status: 201 });
  } catch (error: any) {
    // จัดการข้อผิดพลาด
    // บันทึกข้อผิดพลาดใน console
    console.log({
      message: error.message,
      stack: error.stack,
      function: "POST Create",
    });
    return NextResponse.json(
      { error: "มีปัญหาในการเพิ่มข้อมูล" },
      { status: 500 }
    );
  }
}
