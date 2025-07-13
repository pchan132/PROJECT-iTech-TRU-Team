"use client";
import React, { useEffect, useState } from "react";
import {
  Edit,
  Trash2,
  Plus,
  Search,
  FileText,
  User,
  Image,
  Router,
} from "lucide-react";

import { useRouter } from "next/navigation";
// ข้อมูล
//  id : number;
//   artifact_name : string;
//   title : string;
//   first_name : string;
//   last_name : string;
//   description : string;
//   external_link : string;
//   image_filename : string;
//   pdf_filename : string;

export default function Table({
  data,
  fetchData,
}: {
  data: any[];
  fetchData: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  ///////// ฟังก์ขั่น Delete /////////////////////
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/research/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // ใช้ Router
  const router = useRouter();
  ///////// ฟังชั่น Edit //////////////////
  const handleEdit = async (id: number, item: any) => {
    router.push(`/page/insertData?id=${id}`);
  };

  ///////////  เพิ่มข้อมูล ////////////////
  const handleAdd = () => {
    router.push("/page/insertData");
  };

  // ค้นหาข้อมูล
  const filteredData = data.filter(
    (item) =>
      item.artifact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-gradient-to-br ">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text text-gray-800">
            ระบบจัดการข้อมูลสิ่งประดิษฐ์และนวัตกรรม
          </h1>
          <p>จัดการงานและติดตามข้อมูลสิ่งประดิษฐ์และนวัตกรรม</p>
        </div>

        {/* search */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="ค้นหางานวิจัย..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* เพิ่มข้อมูล */}
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onClick={handleAdd}
            >
              เพิ่มงานวิจัยใหม่
            </button>
          </div>
        </div>

        {/* ตาราง Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    ลำดับ
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    ชื่อโครงการ
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    รูปภาพ
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    บทคัดย่อ
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    ผู้วิจัย
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    นามสกุล
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    ไฟล์งานวิจัย
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    การดำเนินการ
                  </th>
                </tr>
              </thead>

              {/* -ข้อมูล */}
              <tbody>
                {currentData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 max-w-xs">
                        {item.artifact_name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative group">
                        <img
                          src={`/${item.image_filename}`}
                          alt={item.artifact_name}
                          className="w-20 h-14 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700 max-w-xs">
                        <div className="line-clamp-3">{item.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="text-gray-400" size={16} />
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">
                            {item.title}
                            {item.first_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">
                            {item.last_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="text-blue-500" size={16} />
                        <a
                          href={`/${item.pdf_filename}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline"
                        >
                          ดาวน์โหลดไฟล์
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(item.id, item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150 hover:shadow-md"
                          title="แก้ไข"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150 hover:shadow-md"
                          title="ลบ"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* กดเปลี่ยนตาราง */}
          <div className="mt-4 flex justify-center gap-2 my-5">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
