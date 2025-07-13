import { db } from "@/lib/db"; // เชื่อม Database Mysql
import { NextRequest, NextResponse } from "next/server";
//ทำให้เขียนไฟล์ได้
import { writeFile, mkdir } from "fs/promises";
// เรียก path
import path from "path";

// ตึงข้อมูล
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM research");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error Fetching research: ", error);
  }
}

// เพิ่มข้อมูล
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    console.log("formData:", formData);
    // ดึงข้อมูลจาก Form
    // ข้อความ ธรรมดา
    const ArtifactName = formData.get("ArtifactName")?.toString() ?? "";
    const Description = formData.get("Description")?.toString() ?? "";
    const ExternalLink = formData.get("ExternalLink")?.toString() ?? "";
    const FirstName = formData.get("FirstName")?.toString() ?? "";
    const LastName = formData.get("LastName")?.toString() ?? "";
    const Title = formData.get("Title")?.toString() ?? "";

    // ไฟล์ต่างๆ
    const imageFile = formData.get("ImageFile") as File | null;
    const pdfFile = formData.get("AttachedPDF") as File | null;

    // สร้าง folder เพื่อเก็บไฟล์
    const uploadDir = path.join(process.cwd(), "public/uploads");
    // เริ่มสร้าง
    await mkdir(uploadDir, { recursive: true });
    // เก็บชื่อไฟล์
    let imageFileName: string | null = null;
    let pdfFileName: string | null = null;

    // บันทึกรูป
    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      imageFileName = `${Date.now()}-${imageFile.name}`;
      const imagePath = path.join(uploadDir, imageFileName);
      await writeFile(imagePath, buffer);
    }

    // บันทึก PDF
    if (pdfFile) {
      const bytes = await pdfFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      pdfFileName = `${Date.now()}-${pdfFile.name}`;
      const pdfPath = path.join(uploadDir, pdfFileName);
      await writeFile(pdfPath, buffer);
    }

    // 🔄 บันทึกข้อมูลลง MySQL
    await db.query(
      `INSERT INTO research (
        artifact_name, description, external_link,
        image_filename, pdf_filename,
        first_name, last_name, title
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        ArtifactName,
        Description,
        ExternalLink,
        `uploads/${imageFileName}`, // ✅ เก็บ path สั้น
        `uploads/${pdfFileName}`, // ✅ เก็บ path สั้น
        FirstName,
        LastName,
        Title,
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Error Saving research: ", error);
    return NextResponse.json(
      {
        error: "เกิดข้อผิดพลาดในการบันทึกข้อมูล research",
      },
      { status: 500 }
    );
  }
}
