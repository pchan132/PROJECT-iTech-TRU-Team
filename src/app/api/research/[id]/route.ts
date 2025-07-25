import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import path from "path"; // ใช้ path เพื่อจัดการกับเส้นทางไฟล์
import fs from "fs/promises"; // ใช้ fs/promises เพื่อจัดการกับไฟล์แบบ Promise

const prisma = new PrismaClient();

// ดึงข้อมูลการวิจัยทัตาม Id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // ค้นหาข้อมูลการวิจัยตาม id
    const researchData = await prisma.research.findUnique({
      where: { id: Number(id) },
    });

    // ตรวจสอบว่าพบข้อมูลหรือไม่
    if (!researchData) {
      return NextResponse.json(
        { error: "ไม่พบข้อมูลการวิจัย" },
        { status: 404 }
      );
    }

    // ส่งข้อมูลการวิจัยกลับ
    return NextResponse.json(researchData);
  } catch (error: any) {
    console.log({
      message: error.message,
      stack: error.stack,
      function: "GET FindUnique",
    });
    return NextResponse.json(
      { error: "มีปัญหาในการดึงข้อมูล" },
      { status: 500 }
    );
  }
}

// อัพเดทข้อมูลการวิจัยตาม Id
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; // รับ id
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

    // รับข้อมูลไฟล์
    const image_filename = formData.get("ImageFile") as File | null;
    const pdf_filename = formData.get("AttachedPDF") as File | null;

    // สร้างตัวแปรสำหรับสร้าง ชื่อไฟล์
    let imageFileName = null;
    let pdfFileName = null;

    // ตรวจสอบว่ามีไฟล์หรือไม่ และบันทึกไฟล์
    if (image_filename) {
      imageFileName = `research_${Date.now()}_${image_filename.name}`;
      const imageBuffer = Buffer.from(await image_filename.arrayBuffer());
      const imagePath = path.join(
        process.cwd(),
        "public",
        "uploads",
        imageFileName
      );
      await fs.mkdir(path.dirname(imagePath), { recursive: true });
      await fs.writeFile(imagePath, imageBuffer);
    }

    if (pdf_filename) {
      pdfFileName = `research_${Date.now()}_${pdf_filename.name}`;
      const pdfBuffer = Buffer.from(await pdf_filename.arrayBuffer());
      const pdfPath = path.join(
        process.cwd(),
        "public",
        "uploads",
        pdfFileName
      );
      await fs.mkdir(path.dirname(pdfPath), { recursive: true });
      await fs.writeFile(pdfPath, pdfBuffer);
    }

    // อัพเดทข้อมูลการวิจัยในฐานข้อมูล
    const updatedResearch = await prisma.research.update({
      where: { id: Number(id) },
      data: {
        artifact_name,
        title,
        first_name,
        last_name,
        description,
        external_link,
        image_filename: imageFileName ? imageFileName : undefined, // ถ้าไม่มีไฟล์จะไม่อัพเดท
        pdf_filename: pdfFileName ? pdfFileName : undefined, // ถ้าไม่มีไฟล์จะไม่อัพเดท
      },
    });

    return NextResponse.json(updatedResearch);
  } catch (error: any) {
    console.log({
      message: error.message,
      stack: error.stack,
      function: "PUT Update Research",
    });
    return NextResponse.json(
      { error: "มีปัญหาในการอัพเดทข้อมูล" },
      { status: 500 }
    );
  }
}
