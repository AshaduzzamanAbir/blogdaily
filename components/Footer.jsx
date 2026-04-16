import { assets } from "@/Assets/assets";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-around sm:flex-row flex-col gap-5 items-center px-4 py-4 bg-black">
      <Image src={assets.logo} alt="logo" width={100} loading="lazy" />
      <p className="text-center text-sm text-white">
        {" "}
        All right reserved. copyright @ashaduzzaman taluckder
      </p>
      <div className="flex gap-2">
        <Image
          src={assets.facebook_icon}
          width={30}
          alt="facebook_icon"
          loading="lazy"
        />
        <Image
          src={assets.twitter_icon}
          width={30}
          alt="twitter_icon"
          loading="lazy"
        />
        <Image
          src={assets.googleplus_icon}
          width={30}
          alt="googleplus_icon"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Footer;
