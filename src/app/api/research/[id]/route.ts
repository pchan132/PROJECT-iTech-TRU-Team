import { db } from "@/lib/db";
import { NextResponse } from "next/server";
//ทำให้เขียนไฟล์ได้
import { writeFile, mkdir } from "fs/promises";
// เรียก path
import path from "path";

// ✅ GET ข้อมูลตาม id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const [data] = await db.query(
      `SELECT * FROM research WHERE id = ? LIMIT 1`,
      [id]
    );

    if (!data) {
      return NextResponse.json({ error: "ไม่พบข้อมูล" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    return NextResponse.json({ error: "ดึงข้อมูลไม่สำเร็จ" }, { status: 500 });
  }
}

// ✅ PUT อัปเดตข้อมูล
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const formData = await req.formData();
    console.log("formData:", formData);

    const ArtifactName = formData.get("ArtifactName")?.toString() ?? "";
    const Description = formData.get("Description")?.toString() ?? "";
    const ExternalLink = formData.get("ExternalLink")?.toString() ?? "";
    const FirstName = formData.get("FirstName")?.toString() ?? "";
    const LastName = formData.get("LastName")?.toString() ?? "";
    const Title = formData.get("Title")?.toString() ?? "";
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

    await db.query(
      `UPDATE research SET
        artifact_name = ?,
        description = ?,
        external_link = ?,
        image_filename = ?,
        pdf_filename = ?,
        first_name = ?,
        last_name = ?,
        title = ?
        WHERE id = ?
        `,
      [
        ArtifactName,
        Description,
        ExternalLink,
        `uploads/${imageFileName}`,
        `uploads/${pdfFileName}`,
        FirstName,
        LastName,
        Title,
        id,
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Error Updating research: ", error);
    return NextResponse.json(
      {
        error: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล research",
      },
      {
        status: 500,
      }
    );
  }
}

// ✅ DELETE ข้อมูล
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    await db.query(`DELETE FROM research WHERE id = ?`, [id]);
    return NextResponse.json({ message: "ลบข้อมูลสำเร็จ" });
  } catch (error) {
    console.error("Error deleting data:", error);
    return NextResponse.json({ error: "ลบไม่สำเร็จ" }, { status: 500 });
  }
}
