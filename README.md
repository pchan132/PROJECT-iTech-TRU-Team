Back end
สร้าง เส้น CRUD RESTFULL API ตอนนี้ แค่การเพิ่มสิ่งประดิษฐ์
การใช้งาน !!!!!

1. ดูรายชื่อ สิ่งประดิษฐ์ ทั้งหมด ใช้ Method GET เข้า path : api/research
2. เพิ่มข้อมูลสิ่งประดิษฐ์ ใช้ Method POST เข้า path : api/research
3. แก้ไข้ ข้อมูสิ่งประดิษฐ์ ใช้ Method PUT เข้า path : api/research/[id]
4. ลบข้อมูลสิ่งประดิษฐ์ ใช้ Method DELETE เข้า path : api/research/[id]

ข้อมูลที่ต้องเพิ่มมี
```bash
ArtifactName, // เป็นชื่อ ข้อสิ่งประดิษฐ์
Title, // เป็น คำนำหน้าชื่อ-นามสกุล
FirstName, // เป็น ชือจริง
LastName, // นามสกุล
Description, // คำอธิบาย โปรเจค
ExternalLink, // ลิ้ง
ImageFile, // ไฟล์ ภาพ
AttachedPDF, // ไฟล์ PDF
```
---

สร้างฐานข้อมูล
```bash
model member {
  UserID      Int      @id @default(autoincrement())
  email    String?  @db.VarChar(45) @unique
  Password    String?  @db.VarChar(45)
  LoginStatus Int
  LastUpdate  DateTime @db.DateTime(0)
}

model Research {
  id             Int      @id @default(autoincrement())
  artifact_name  String   @db.VarChar(100)
  title          String?  @db.VarChar(45)
  first_name     String?  @db.VarChar(45)
  last_name      String?  @db.VarChar(45)
  description    String   @db.VarChar(1500)
  external_link  String   @db.VarChar(400)
  image_filename String   @db.VarChar(255)
  pdf_filename   String?  @db.VarChar(100)
  created_at     DateTime @default(now()) @db.Timestamp(0)
}
```
