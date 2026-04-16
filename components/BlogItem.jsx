import { assets, blog_data } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogItem = ({ title, description, category, image, id }) => {
  return (
    <>
      <div className="max-w-[330px] sm:max-w-[300px] bg-white border-black border-1">
        <Link href={`/blogs/${id}`}>
          <Image
            src={image}
            alt="image"
            width={400}
            height={400}
            className="border"
            priority
          />
        </Link>
        <p className="ml-5 mt-5 px-1 inline-block text-sm bg-black text-white">
          {category}
        </p>
        <div className="p-5">
          <h5 className="mb-2 text-lg font-medium tracking-tight line">
            {title}
          </h5>
          <p
            className="text-md py-2"
            dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}
          ></p>
          <Link
            href={`/blogs/${id}`}
            className="flex items-center gap-2 text-center font-semibold cursor-pointer"
          >
            Read more..{" "}
            <Image
              className="mt-1"
              src={assets.arrow}
              alt=""
              width={12}
              priority
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogItem;
