"use client";
import { assets, blog_data } from "@/Assets/assets";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";
import axios from "axios";
import { use } from "react";
import { useParams } from "next/navigation";

const page = ({ params, image }) => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await axios.get("/api/blog", {
      params: {
        id: params.id,
      },
    });
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return data ? (
    <>
      <div className="bg-gray-300 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.logo}
              width={160}
              alt="logo"
              className="sm:w-auto"
              priority
            />
          </Link>
          <button className="flex items-center gap-2 px-3 py-1 text-nowrap sm:py-3 lg:py-3 border border-black border-solid transition-all hover:shadow-[-7px_5px_0px_#000000] cursor-pointer">
            get start{" "}
            <Image src={assets.arrow} alt="arrow" loading="lazy" width={10} />
          </button>
        </div>

        <div className="text-center my-24">
          <h1 className="text-3xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </h1>
          <Image
            loading="lazy"
            src="/author_img.png"
            alt={data.authorImg || "default image"}
            width={90}
            height={90}
            className="mx-auto mt-6 border border-white rounded-full"
          />
          <h4 className="text-center text-md font-extrabold mt-4">
            {data.author}
          </h4>
        </div>

        <div className="flex flex-col gap-2 justify-center lg:px-36 md:px-12 sm:px-6 py-5">
          <Image
            src={
              data.image ||
              "https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg"
            }
            alt={data.image || "default image"}
            width={1280}
            height={720}
            priority
            className="m-auto"
          />

          <div className="my-10 mt-10">
            <h2 className="text-3xl font-extrabold mb-6">Title:</h2>
            <p className="text-xl ">{data.title}</p>
          </div>

          <div className="mb-10 blog-content">
            <h3 className=" text-2xl font-extrabold my-4">
              Step 1 : Self-Refiection and goal setting
            </h3>
            <p
              className="text-xl py-2"
              dangerouslySetInnerHTML={{ __html: data.description }}
            ></p>
            <p className="text-xl py-2">
              Lorem ipsum dolor sit amet consectetur adolor sit amet
              consectetlorem5 Lorem ipsum dolor sit amet. ur adipisicidipisicing
              elit. Dicta, soluta sint officia hic fugit commodi.
            </p>
          </div>

          <div className="my-24">
            <h6 className="text-xl font font-extrabold my-4">
              share this articale on :{" "}
            </h6>
            <div className="flex gap-4">
              <Image
                className="cursor-pointer"
                src={assets.facebook_icon}
                alt="facebook_icon"
                priority
                width={50}
              />
              <Image
                className="cursor-pointer"
                src={assets.twitter_icon}
                alt="twitter_icon"
                priority
                width={50}
              />
              <Image
                className="cursor-pointer"
                src={assets.googleplus_icon}
                alt="googleplus_icon"
                priority
                width={50}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default page;
