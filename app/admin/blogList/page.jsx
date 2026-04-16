"use client";
import BlogTableItem from "@/components/AdminComponents/BlogTableItem";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const page = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get("/api/blog");
    setBlogs(response.data.blogs);
  };

  const deleteBlog = async (mongoId) => {
    const response = await axios.delete("/api/blog", {
      params: {
        id: mongoId,
      },
    });
    toast.success(response.data.msg);
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h2 className="text-md font-medium">All blogs</h2>
      <div className="relative border border-gray-400 max-w-[850px] h-[80vh] mt-4 scrollbar-hide">
        <table className="w-full text-sm text-gray-700">
          <thead className="text-sm bg-gray-300 uppercase">
            <tr>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Author Name
              </th>
              <th scope="col" className="px-6 py-3">
                Blog title
              </th>
              <th scope="col" className="px-6 py-3">
                date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, index) => {
              return (
                <BlogTableItem
                  key={index}
                  authorImg={item.authorImg}
                  mongoId={item._id}
                  title={item.title}
                  author={item.author}
                  date={item.date}
                  deleteBlog={deleteBlog}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;

// import BlogTableItem from "@/components/AdminComponents/BlogTableItem";

// export default async function Page() {
//   const res = await fetch("http://localhost:3000/api/blog", {
//     cache: "no-store",
//   });

//   const data = await res.json();

//   return (
//     <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
//       <h2 className="text-md font-medium">All blogs</h2>

//       <div className="relative border border-gray-400 max-w-[850px] h-[80vh] mt-4 scrollbar-hide">
//         <table className="w-full text-sm text-gray-700">
//           <thead className="text-sm bg-gray-300 uppercase">
//             <tr>
//               <th className="hidden sm:block px-6 py-3">Author Name</th>
//               <th className="px-6 py-3">Blog title</th>
//               <th className="px-6 py-3">date</th>
//               <th className="px-6 py-3">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {data.blogs.map((item) => (
//               <BlogTableItem
//                 key={item._id}
//                 authorImg={item.authorImg}
//                 mongoId={item._id}
//                 title={item.title}
//                 author={item.author}
//                 date={item.date}
//               />
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
