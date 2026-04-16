import Sidebar from "@/components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from "react-toastify";

export default function ({ children }) {
  return (
    <>
      <div className="flex">
        <ToastContainer theme="dark" />
        <Sidebar />
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between px-4 py-2.5 w-full border-black border-b">
            <h2>Admin Panel</h2>
            <Image
              src="/author_img.png"
              className=" rounded-full"
              width={40}
              height={40}
              alt="Admin Image"
              loading="lazy"
            />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
