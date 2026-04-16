import { connectDB } from "@/lib/config/db.js";
import BlogModel from "@/lib/models/BlogModels.js";
import { NextResponse } from "next/server";
// import { writeFile } from "fs/promises";
// const fs = require("fs");

import cloudinary from "@/lib/cloudinary";
import { Buffer } from "buffer";

const LoadDB = async () => {
  await connectDB();
};

LoadDB();

// Api Endpoint for get all blogs
export async function GET(request) {
  await connectDB(); // ✅ Connect to DB inside the function to avoid connection issues

  const blogId = await request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }
}

// Api Endpoint for Uploading Blogs
// export async function POST(request) {
//   try {
//     const formData = await request.formData();
//     const timeStamp = Date.now();

//     const image = formData.get("image");
//     const imageByteData = await image.arrayBuffer();
//     const buffer = Buffer.from(imageByteData);
//     const path = `./public/${timeStamp}_${image.name}`;
//     await writeFile(path, buffer);
//     const imgUrl = `/${timeStamp}_${image.name}`;

//     const blogData = {
//       title: `${formData.get("title")}`,
//       description: `${formData.get("description")}`,
//       category: `${formData.get("category")}`,
//       author: `${formData.get("author")}`,
//       image: `${imgUrl}`,
//       authorImg: `${formData.get("authorImg")}`,
//     };

//     await BlogModel.create(blogData);
//     console.log("Save Blog");

//     return NextResponse.json({ success: true, msg: "blog uploaded" });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { success: false, error: "Upload failed" },
//       { status: 400 },
//     );
//   }
// }

// cloudinary
// export async function POST(request) {
//   try {
//     await connectDB(); // ✅ Connect to DB inside the function to avoid connection issues

//     const formData = await request.formData();

//     const file = formData.get("image");

//     if (!file) {
//       return NextResponse.json({ error: "Image required" }, { status: 400 });
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     // upload to cloudinary
//     // const upload = await new Promise((resolve, reject) => {
//     //   cloudinary.uploader
//     //     .upload_stream({ folder: "blogs" }, (error, result) => {
//     //       if (error) reject(error);
//     //       else resolve(result);
//     //     })
//     //     .end(buffer);
//     // });
//     let upload;

//     try {
//       upload = await new Promise((resolve, reject) => {
//         cloudinary.uploader
//           .upload_stream({ folder: "blogs" }, (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           })
//           .end(buffer);
//       });
//     } catch (error) {
//       console.error("Cloudinary upload error:", error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }

//     const blogData = {
//       title: formData.get("title"),
//       description: formData.get("description"),
//       category: formData.get("category"),
//       author: formData.get("author"),
//       image: upload.secure_url, // ✅ cloudinary URL
//       public_id: upload.public_id, // ✅ VERY IMPORTANT
//       authorImg: formData.get("authorImg") || "/author_img.png",
//     };

//     await BlogModel.create(blogData);

//     return NextResponse.json({
//       success: true,
//       msg: "Blog uploaded",
//     });
//   } catch (err) {
//     console.error("POST error:", err);
//     return NextResponse.json({ error: "Upload failed" }, { status: 500 });
//   }
// }

export async function POST(request) {
  try {
    await connectDB(); // ✅ FIXED

    const formData = await request.formData();

    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ error: "Image required" }, { status: 400 });
    }

    if (!formData.get("title") || !formData.get("description")) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let upload;

    try {
      upload = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "blogs" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });
    } catch (error) {
      console.error("Cloudinary error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: upload.secure_url,
      public_id: upload.public_id,
      authorImg: formData.get("authorImg") || "/author_img.png",
    };

    await BlogModel.create(blogData);

    return NextResponse.json({
      success: true,
      msg: "Blog uploaded",
    });
  } catch (err) {
    console.error("POST ERROR:", err);

    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 },
    );
  }
}

// export async function DELETE(request) {
//   const id = await request.nextUrl.searchParams.get("id");
//   const blog = await BlogModel.findById(id);
//   fs.unlink(`./public${blog.image}`, () => {});
//   await BlogModel.findByIdAndDelete(id);

//   return NextResponse.json({ msg: "Blog Delete!" });
// }

// cloudinary delete
export async function DELETE(request) {
  try {
    await connectDB(); // ✅ Connect to DB inside the function to avoid connection issues

    const id = request.nextUrl.searchParams.get("id");

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // ✅ delete image from cloudinary
    if (blog.public_id) {
      await cloudinary.uploader.destroy(blog.public_id);
    }

    // ✅ delete blog
    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({
      msg: "Blog + Image Deleted!",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
