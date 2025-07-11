"use client";

// Card
// เป็นฟังก์ชั่น ที่รับข้อมูลมากผ่าน props
export default function InnovationCard({
  // รับข้อมูลผ่าน props
  ArtifactName,
  Title,
  FirstName,
  LastName,
  Description,
  ExternalLink,
  ImageFile,
  AttachedPDF,
}: {
  // รับข้อมูลผ่าน props
  ArtifactName: string;
  Title: string;
  FirstName: string;
  LastName: string;
  Description: string;
  ExternalLink: string;
  ImageFile: string;
  AttachedPDF: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg border">
      <div className="relative">
        <img src={ImageFile} alt={ImageFile} 
        className="w-full h-48 object-cover"
        />
      </div>
    </div>
  );
}
