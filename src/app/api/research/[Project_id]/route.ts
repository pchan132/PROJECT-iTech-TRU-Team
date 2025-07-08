import { db } from "@/lib/db";
import { NextResponse } from "next/server";

////////////////// อัปเดตข้อมูล //////////////////
export async function PUT(
  req: Request,
  { params }: { params: { Project_id: string } }
) {
  const Project_id = parseInt(params.Project_id); // แปลงให้แน่ใจว่าเป็นเลข
  const {
    ArtifactName,
    Title,
    FirstName,
    LastName,
    Description,
    ExternalLink,
    ImageFile,
    AttachedPDF,
  } = await req.json();
  
  // ตรวจสอบว่า Project_id เป็นตัวเลขหรือไม่
  if (isNaN(Project_id)) {
    return NextResponse.json({ error: "Invalid Project_id" }, { status: 400 });
  }
  // ตรวจสอบข้อมูล
  if (!ArtifactName) {
    return NextResponse.json(
      {
        error: "ArtifactName is required",
      },
      { status: 400 }
    );
  } else if (!Title) {
    return NextResponse.json(
      {
        error: "Title is required",
      },
      { status: 400 }
    );
  } else if (!FirstName) {
    return NextResponse.json(
      {
        error: "FirstName is required",
      },
      { status: 400 }
    );
  } else if (!LastName) {
    return NextResponse.json(
      {
        error: "LastName is required",
      },
      { status: 400 }
    );
  } else if (!Description) {
    return NextResponse.json(
      {
        error: "Description is required",
      },
      { status: 400 }
    );
  } else if (!ImageFile) {
    return NextResponse.json(
      {
        error: "ImageFile is required",
      },
      { status: 400 }
    );
  } else if (!AttachedPDF) {
    return NextResponse.json(
      {
        error: "AttachedPDF is required",
      },
      { status: 400 }
    );
  } else {
    // อัปเดตข้อมูลในฐานข้อมูล
    try {
      await db.query(
        `UPDATE research SET ArtifactName = ?, Title = ?, FirstName = ?, LastName = ?, Description = ?, ExternalLink = ?, ImageFile = ?, AttachedPDF = ? WHERE Project_id = ?`,
        [
          ArtifactName,
          Title,
          FirstName,
          LastName,
          Description,
          ExternalLink,
          ImageFile,
          AttachedPDF,
          Project_id,
        ]
      );

      // ส่งการตอบกลับ
      return NextResponse.json(
        {
          message: "Data updated successfully",
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error updating data:", error);
      return NextResponse.json(
        {
          error: "Failed to update data",
        },
        { status: 500 }
      );
    }
  }
}

/////////////////////// ลบข้อมูล ////////////////////////
export async function DELETE(
  req: Request,
  { params }: { params: { Project_id: string } }
) {
  try {
    const Project_id = parseInt(params.Project_id);

    // ลบข้อมูลในฐานข้อมูล
    await db.query(`DELETE FROM research WHERE Project_id = ?`, [Project_id]);

    // ส่งการตอบกลับ
    return NextResponse.json(
      {
        message: "Data deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting data:", error);
    return NextResponse.json(
      {
        error: "Failed to delete data",
      },
      { status: 500 }
    );
  }
}
