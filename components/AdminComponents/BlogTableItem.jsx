// import { assets } from "@/Assets/assets";
// import Image from "next/image";
// import React from "react";

// const BlogTableItem = ({
//   authorImg,
//   title,
//   author,
//   date,
//   mongoId,
//   deleteBlog,
// }) => {
//   const BlogDate = new Date(date);

//   return (
//     <tr className="bg-white border-b">
//       <th
//         scope="row"
//         className="items-center justify-center gap-5 hidden sm:flex px-6 py-4 text-gray-900 whitespace-nowrap"
//       >
//         <div className="rounded-full overflow-hidden">
//           <Image
//             className="rounded-full"
//             width={50}
//             height={50}
//             alt="author img"
//             src={authorImg ? authorImg : assets.profile_icon}
//             loading="lazy"
//           />
//         </div>
//         <p className="capitalize font-medium">
//           {author ? author : "no author"}
//         </p>
//       </th>
//       <td className="capitalize px-6 py-4 text-center">
//         {title ? title : "no title"}
//       </td>
//       <td className="px-6 py-4 text-center">{BlogDate.toDateString()}</td>
//       <td className="px-6 py-4 text-center ">
//         <span onClick={() => deleteBlog(mongoId)} className="cursor-pointer">
//           X
//         </span>
//       </td>
//     </tr>
//   );
// };

// export default BlogTableItem;

import { assets } from "@/Assets/assets";
import Image from "next/image";
import React, { useMemo } from "react";

const BlogTableItem = ({
  authorImg,
  title,
  author,
  date,
  mongoId,
  deleteBlog,
}) => {
  // ✅ memoize date calculation (prevents recalculation)
  const formattedDate = useMemo(() => {
    return date ? new Date(date).toDateString() : "no date";
  }, [date]);

  return (
    <tr className="bg-white border-b hover:bg-gray-50 transition">
      {/* AUTHOR */}
      <th className="hidden sm:flex items-center gap-4 px-6 py-4 text-gray-900 whitespace-nowrap">
        <div className="rounded-full overflow-hidden w-[40px] h-[40px]">
          <Image
            src={authorImg || assets.profile_icon}
            alt="author"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        </div>

        <p className="capitalize font-medium">{author || "no author"}</p>
      </th>

      {/* TITLE */}
      <td className="capitalize px-6 py-4 text-center">
        {title || "no title"}
      </td>

      {/* DATE */}
      <td className="px-6 py-4 text-center">{formattedDate}</td>

      {/* ACTION */}
      <td className="px-6 py-4 text-center">
        <button
          onClick={() => deleteBlog(mongoId)}
          className="text-red-500 hover:text-red-700 transition"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default React.memo(BlogTableItem);
