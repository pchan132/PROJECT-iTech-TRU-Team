Back end
สร้าง เส้น CRUD RESTFULL API ตอนนี้ แค่การเพิ่มสิ่งประดิษฐ์
การใช้งาน !!!!!

1. ดูรายชื่อ สิ่งประดิษฐ์ ทั้งหมด ใช้ Method GET เข้า path : api/research
2. เพิ่มข้อมูลสิ่งประดิษฐ์ ใช้ Method POST เข้า path : api/research
3. แก้ไข้ ข้อมูสิ่งประดิษฐ์ ใช้ Method PUT เข้า path : api/research/[Project_id]
4. ลบข้อมูลสิ่งประดิษฐ์ ใช้ Method DELETE เข้า path : api/research/[Project_id]

ข้อมูลที่ต้องเพิ่มมี
ArtifactName, // เป็นชื่อ ข้อสิ่งประดิษฐ์
Title, // เป็น คำนำหน้าชื่อ-นามสกุล
FirstName, // เป็น ชือจริง
LastName, // นามสกุล
Description, // คำอธิบาย โปรเจค
ExternalLink, // ลิ้ง
ImageFile, // ไฟล์ ภาพ
AttachedPDF, // ไฟล์ PDF
------------------------------------------------------------------------------------------------------------

สร้างฐานข้อมูล
CREATE TABLE research (
  id INT AUTO_INCREMENT PRIMARY KEY,
  artifact_name VARCHAR(255),
  description TEXT,
  external_link VARCHAR(255),
  image_filename VARCHAR(255),
  pdf_filename VARCHAR(255),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  title VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE itech.member (
idmember INT NOT NULL AUTO_INCREMENT,
Username VARCHAR(45) NOT NULL,
Password VARCHAR(45) NOT NULL,
LastUpdate VARCHAR(45) NOT NULL,
Date DATETIME NULL,
PRIMARY KEY (idmember));


