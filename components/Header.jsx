"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

const Header = () => {
  const [email, setEmail] = useState("");

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post("/api/email", formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail("");
    } else {
      toast.error("Error");
    }
  };

  return (
    <div className="py-5 px-5 md:px-12 lg:px28">
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          width={120}
          alt="logo"
          loading="lazy"
          className="w-[120] sm:w-auto"
        />
        <Link href="http://localhost:3000/admin">
          <button className="flex items-center gap-2 px-3 py-1 text-nowrap sm:py-3 lg:py-3 border border-black border-solid transition-all hover:shadow-[-7px_5px_0px_#000000] cursor-pointer">
            get start{" "}
            <Image src={assets.arrow} alt="arrow" width={10} loading="lazy" />
          </button>
        </Link>
      </div>
      <div className="text-center my-8">
        <h1 className="capitalize text-[3vw] sm:5xl font-medium">
          latest blog
        </h1>
        <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolor,
          sapiente laboriosam sint in provident.
        </p>
        <form
          onSubmit={onSubmitEmail}
          action=""
          className="flex justify-between max-w-[500px] mx-auto mt-10 scale-75 sm:scale-100 border-1 hover:shadow-[-7px_5px_0px_#000000]  transition"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your Email"
            className="outline-none pl-3 py-4 w-full h-full"
          />
          <button
            type="submit"
            className="border-l border-black px-4 sm:px-8 active:bg-gray-600 cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
