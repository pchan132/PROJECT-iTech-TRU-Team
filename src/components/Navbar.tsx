export default function Navbar() {
  return (
    <nav className=" p-4 bg-red-500 ">
      <h1 className="text-xl font-bold">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            {/* LOGO วงกลม 3 จุด */}
            <div className="text-red-600 font-bold">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                className="text-red-600"
              >
                <circle cx="16" cy="8" r="6" fill="currentColor" />
                <circle cx="8" cy="20" r="6" fill="green" />
                <circle cx="24" cy="20" r="6" fill="blue" />
              </svg>
            </div>
          </div>
          {/* ข้อความ */}
          <div className="text-white ml-2">
            <h1 className="text-lg font-bold">
              สิ่งประดิษฐ์และนวัตกรรมคณะเทคโนโลยีอุตสาหกรรม
            </h1>
            <p className="text-sm opacity-90">
              Inventions and Innovations Faculty of Industrial Technology
            </p>
          </div>
        </div>
      </h1>
    </nav>
  );
}
