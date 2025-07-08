import { db } from "@/lib/db";
import { NextResponse } from "next/server";

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
export async function POST(req: Request) {
  // ข้อมูล
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

  //   ตรวจสอบข้อมูล
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
  } else if (!ExternalLink) {
    return NextResponse.json(
      {
        error: "ExternalLink is required",
      },
      { status: 400 }
    );
  } else {
    try {
      //   เพิ่มข้อมูล
      const [result] = await db.query(
        "INSERT INTO research (ArtifactName, Title, FirstName, LastName, Description, ExternalLink, ImageFile, AttachedPDF) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          ArtifactName,
          Title,
          FirstName,
          LastName,
          Description,
          ExternalLink,
          ImageFile,
          AttachedPDF,
        ]
      );

      return NextResponse.json({
        message: "Research added successfully",
      });
    } catch (error) {
      console.error("Error Adding research: ", error);
      return NextResponse.json(
        {
          error: "Failed to add research",
        },
        { status: 500 }
      );
    }
  }
}
