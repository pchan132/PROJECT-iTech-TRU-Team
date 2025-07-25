"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input"; // สมมุติว่าใช้ UI จากคุณ
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// รับข้อมูลจาก params
import { useSearchParams } from "next/navigation";

// สร้างฟังก์ชั่นควบคุมการกรอกข้อมูล
const formSchema = z.object({
  ArtifactName: z.string().min(1, "กรุณาใส่ชื่อโครงการ/หัวข้องานวิจัย"),
  Description: z.string().min(1, "กรุณาใส่บทคัดย่อ"),
  ExternalLink: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val || /^((https?:\/\/)?([\w.-]+\.[a-z]{2,})(\/\S*)?)$/i.test(val),
      {
        message:
          "กรุณากรอกลิงก์ให้ถูกต้อง เช่น example.com หรือ https://example.com",
      }
    ),
  ImageFile: z.instanceof(File).optional(),
  AttachedPDF: z.instanceof(File).optional(),
  FirstName: z.string().min(1, "กรุณาใส่ชื่อผู้จัดทำ"),
  LastName: z.string().min(1, "กรุณาใส่นามสกุลผู้จัดทำ"),
  Title: z.string().min(1, "กรุณาใส่คำนำหน้าชื่อ"),
});

// สร้างชนิดข้อมูล (TypeScript type) ชื่อ FormData โดยอัตโนมัติ
type FormData = z.infer<typeof formSchema>;

// หน้า เพิ่มข้อมูล innovation
export default function AddResearchPage() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  // หา id ใน params ที่ส่งมา
  const searchParams = useSearchParams();
  const editId = searchParams.get("id"); // ✅ เรียกผ่านตัวแปรเดียวกัน

  // ใช้งานไลบรารี React Hook Form ร่วมกับ Zod โดยมีจุดประสงค์หลักคือการจัดการฟอร์มได้อย่างมีประสิทธิภาพและง่ายดาย
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema) as any,
  });

  //ทำให้ข้อมูลส่งไปให้ API เมื่อกด Submit
  const onSubmitForm = async (data: FormData) => {
    // เตรียมข้อมูล
    const formData = new FormData();
    formData.append("ArtifactName", data.ArtifactName);
    formData.append("Description", data.Description);
    formData.append("Title", data.Title);
    formData.append("FirstName", data.FirstName);
    formData.append("LastName", data.LastName);
    
    // ตรวจสอบ ExternalLink ก่อนส่ง
    if (data.ExternalLink && data.ExternalLink.trim() !== "") {
      formData.append("ExternalLink", data.ExternalLink);
    }
    
    // ตรวจสอบไฟล์ก่อนส่ง
    if (data.ImageFile && data.ImageFile instanceof File) {
      formData.append("ImageFile", data.ImageFile);
    }
    
    if (data.AttachedPDF && data.AttachedPDF instanceof File) {
      formData.append("AttachedPDF", data.AttachedPDF);
    }

    // ส่งข้อมูลไป API POST
    try {
      const response = await fetch(
        editId ? `/api/research/${editId}` : `/api/research`,
        {
          method: editId ? "PUT" : "POST",
          body: formData,
        }
      );
      // เมื่อส่งข้อมูลไม่ได้
      if (!response.ok) {
        throw new Error("ไม่สามารถส่งข้อมูลได้");
      }

      // เมื่อส่งข้อมูลสำเร็จ
      const result = await response.json();

      alert(editId ? "แก้ไขข้อมูลเรียบร้อย" : "บันทึกข้อมูลเรียบร้อย");
      // ล้างข้อมูล
      reset();
      setImagePreviewUrl(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("เกิดข้อผิดพลาด");
    }
  };

  // ทำให้ คลิกที่กล่อง ภาพ แล้วมีให้ใส่ภาพ เพรา className เป็น hidden อยู่ ถ้าไม่มีกดไม่ได้
  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  ////////////// เมื่อเลือกภาพ และ ให้แสดง preview /////////////
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // ให้ข้อมูลเป็น ไฟล์
      setValue("ImageFile", file); // ตั้งค่าให้ react-hook-form ด้วย
      // สร้าง preview URL จากไฟล์ที่เลือก
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // เมื่อเลือก PDF
  const handlePDFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("AttachedPDF", file);
    }
  };

  /////////////// ฟังก์ชั่นรีเซ็ตฟอร์ม /////////////////////
  const handleReset = () => {
    reset();
    setImagePreviewUrl(null);
  };

  // หา id ใน params ที่ส่งมา ถ้ามี id จะ มีค่าไปแทนที่ ใน form
  useEffect(() => {
    if (editId) {
      const fetchData = async () => {
        try {
          const res = await fetch(`/api/research/${editId}`);
          const [data] = await res.json();
          // ใส่ข้อมูลที่ส่งมาก ไปแทนใน form
          setValue("ArtifactName", data.artifact_name);
          setValue("Description", data.description);
          setValue("ExternalLink", data.external_link);
          setValue("FirstName", data.first_name);
          setValue("LastName", data.last_name);
          setValue("Title", data.title);

          // ตั้งค่า preview ภาพ
          if (data.image_filename) {
            setImagePreviewUrl(`/${data.image_filename}`);
          }
          // NOTE: ไฟล์ PDF จะไม่โหลดเป็น File ได้ → ต้องอัปโหลดใหม่ถ้าจะแก้
        } catch (error) {
          console.error("ไม่สามารถโหลดข้อมูล:", error);
        }
      };
      fetchData();
    }
  }, [editId, setValue]);

  return (
    <div className="flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-xl w-full max-w-2xl shadow-lg">
        {/* Header */}
        <div className="bg-red-500 text-white text-center py-4 rounded-t-xl text-xl font-bold">
          แบบฟอร์มเพิ่มข้อมูลงานวิจัย
        </div>

        {/* Form content */}
        <form className="p-6 space-y-5" onSubmit={handleSubmit(onSubmitForm)}>
          <div>
            <label className="font-bold flex items-center gap-2 mb-1">
              📘 ชื่อโครงการ/หัวข้องานวิจัย
            </label>
            <input
              type="text"
              placeholder="เช่น เครื่องสานไหมพลังงานแสงอาทิตย์"
              className="w-full p-2 rounded bg-yellow-200 border border-yellow-300"
              {...register("ArtifactName")}
            />
          </div>
          {/* เมื่อไม่ได้ใส่ หรือ errors ArtifactName*/}
          {errors.ArtifactName && (
            <p className="text-red-500 text-sm">
              {errors.ArtifactName.message}
            </p>
          )}

          {/* ========== ใส่รูปภาพ ================*/}
          <div>
            <label className="font-bold mb-1 block">📷 รูปภาพโครงการ</label>
            <div
              onClick={handleImageClick}
              className="w-full border-2 border-dashed border-gray-300 rounded-md bg-gray-50 py-8 text-center cursor-pointer"
            >
              {imagePreviewUrl ? (
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  className="mx-auto max-h-48 object-contain"
                />
              ) : (
                <>
                  <UploadIcon className="mx-auto text-gray-400 mb-2" />
                  <span className="text-gray-600">
                    คลิกเพื่อเลือกรูปภาพ หรือลากไฟล์มาวาง
                  </span>
                </>
              )}
            </div>
            <Input
              type="file"
              accept="image/*"
              ref={imageInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {/*========== ใส่บทคัดย่อ ===================*/}
          <div>
            <label className="font-bold mb-1 block">บทคัดย่อ</label>
            <Textarea
              rows={5}
              placeholder="เขียนบทคัดย่อของงานวิจัย อธิบายวัตถุประสงค์ วิธีการ และผลลัพธ์ที่สำคัญ..."
              className="bg-yellow-200"
              {...register("Description")}
            />
          </div>
          {/* เมื่อไม่ได้ใส่ Description หรือ errors Description*/}
          {errors.Description && (
            <p className="text-red-500 text-sm">{errors.Description.message}</p>
          )}

          {/*========== ชื่อผู้วิจัย/ผู้จัดทำ ================*/}
          {/* ชื่อผู้จัดทำ */}
          <div>
            <label className="font-bold mb-1 block">👤 คำนำหน้า</label>
            <Input
              type="text"
              className="bg-yellow-200"
              {...register("Title")}
            />
            {/* เมื่อไม่ได้ใส่ Title หรือ errors Title*/}
            {errors.Title && (
              <p className="text-red-500 text-sm">{errors.Title.message}</p>
            )}

            <label className="font-bold mt-3 block">ชื่อ</label>
            <Input
              type="text"
              className="bg-yellow-200"
              {...register("FirstName")}
            />
            {/* เมื่อไม่ได้ใส่ FirstName หรือ errors FirstName*/}
            {errors.FirstName && (
              <p className="text-red-500 text-sm">{errors.FirstName.message}</p>
            )}

            <label className="font-bold mt-3 block">นามสกุล</label>
            <Input
              type="text"
              className="bg-yellow-200"
              {...register("LastName")}
            />
            {/* เมื่อไม่ได้ใส่ LastName หรือ errors LastName*/}
            {errors.LastName && (
              <p className="text-red-500 text-sm">{errors.LastName.message}</p>
            )}
          </div>

          {/*=============== 📄 ไฟล์งานวิจัย (PDF) ==============*/}
          <div>
            <label className="font-bold mb-1 block ">
              📄 ไฟล์งานวิจัย (PDF)
            </label>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              className="bg-white"
              onChange={handlePDFChange}
            />
            {/* แสดงชื่อ PDF เก่า (อ่านอย่างเดียว) */}
            {editId && !errors.AttachedPDF && (
              <p className="text-sm text-gray-500">
                * หากไม่เลือกใหม่ จะใช้ PDF เดิม
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "กำลังบันทึกข้อมูล..."
                : editId
                ? "แก้ไขข้อมูล"
                : "บันทึกข้อมูล"}
            </Button>
            <Button
              onClick={handleReset}
              type="reset"
              className="bg-yellow-300 hover:bg-yellow-400 text-black"
            >
              ล้างข้อมูล
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}