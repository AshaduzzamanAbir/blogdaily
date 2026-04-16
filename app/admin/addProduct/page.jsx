"use client";
import React, { useState } from "react";
import { assets } from "@/Assets/assets";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";

const page = () => {
  // const [image, setImage] = useState(false);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Ashaduzzaman Taluckder",
    authorImg: "/author_img.png",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));

    // console.log(data)
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image);
    // formData.append("image", file); // ✅ file from input
    const response = await axios.post("/api/blog", formData);

    if (response.data.success) {
      toast.success(response.data.msg);
      setImage(e.target.files?.[0]);
      setData({
        title: "",
        description: "",
        category: "",
        author: "Ashaduzzaman Taluckder",
        authorImg: "/author_img.png",
      });
    } else {
      toast.error("error");
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        action=""
        className="pt-5 px-5 sm:pt-12 sm:pl-16"
      >
        <h3 className="text-xl">Upload Thumbnail</h3>
        <label htmlFor="image" className="cursor-pointer">
          <Image
            className="mt-4"
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={100}
            height={60}
            type="file"
            alt={data.title}
            loading="lazy"
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          required
        />

        <p className="mt-4 text-lg pb-2">Blog Title</p>
        <input
          onChange={onChangeHandler}
          className="rounded-sm w-[60%] border outline-none border-black py-2 px-2"
          type="text"
          name="title"
          id="title"
          value={data.title}
          placeholder="Title here"
          required
        />

        <p className="mt-4 text-lg pb-2">Blog Desctiption</p>
        <textarea
          onChange={onChangeHandler}
          className="rounded-sm w-[60%] border outline-none border-black py-2 px-4"
          name="description"
          id="description"
          title="description"
          value={data.description}
          placeholder="write content here"
          required
        ></textarea>

        <p className="mt-4 text-lg pb-2">Blog category</p>
        <select
          onChange={onChangeHandler}
          name="category"
          value={data.category}
          className="outline-none border border-black rounded-sm px-4 py-2 mb-6"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br></br>
        <button
          className="border border-black px-10 py-2 text-white bg-gray-800 cursor-pointer transition-all hover:bg-gray-950"
          type="submit"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default page;
