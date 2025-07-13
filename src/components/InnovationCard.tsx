"use client";

// Card
// เป็นฟังก์ชั่น ที่รับข้อมูลมากผ่าน props
export default function InnovationCard({
  // รับข้อมูลผ่าน props
  artifact_name,
  title,
  first_name,
  last_name,
  description,
  external_link,
  image_filename,
  pdf_filename,
  id,
}: {
  // รับข้อมูลผ่าน props
  artifact_name: string;
  title: string;
  first_name: string;
  last_name: string;
  description: string;
  external_link: string;
  image_filename: string;
  pdf_filename: string;
  id: number;
}) {
  return (
    <div className="w-70 max-w-sm overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="w-full h-48 object-cover"
          src={image_filename}
          alt={image_filename}
        />
      </a>

      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {artifact_name}
          </h5>
        </a>
        {/* line-clamp-3 ทำให้แสดงแค่ 3 บรรทัด */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
        
        <a
          href="#"
          className="w-full inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          ดูรายละเอียด
        </a>
      </div>
    </div>
  );
}
