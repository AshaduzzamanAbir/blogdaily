import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <>
      <div className="flex flex-col bg-slate-100">
        <div className="w-28 sm:w-80 px-2 sm:pl-24 py-3 border-black border">
          <Image
            href="/"
            className="cursor-pointer object-cover sm:w-auto"
            src={assets.logo}
            alt="logo"
            width={80}
            loading="lazy"
          />
        </div>
        <div className="w-28 sm:w-80 h-[100vh] relative py-10 border border-black">
          <div className="absolute w-[50%] sm:w-[80%] right-0">
            <Link
              href="/admin/addProduct"
              className="flex items-center gap-3 border-black border px-4 py-3 mb-5"
            >
              <Image src={assets.add_icon} width={25} alt="" loading="lazy" />{" "}
              <p>Add blogs</p>
            </Link>

            <Link
              href="/admin/blogList"
              className="flex items-center gap-3 border-black border px-4 py-3 mb-5"
            >
              <Image src={assets.blog_icon} width={25} alt="" loading="lazy" />{" "}
              <p>Blogs lists</p>
            </Link>

            <Link
              href="/admin/subscriptions"
              className="flex items-center gap-3 border-black border px-4 py-3 mb-5"
            >
              <Image src={assets.email_icon} width={25} alt="" loading="lazy" />{" "}
              <p>Subsciptions</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
