import Image from "next/image";
import React from "react";

export function HeroSection() {
  return (
    <div className="relative md:bg-heroBGLG bg-heroBGSM bg-contain md:bg-auto bg-no-repeat bg-center w-screen h-max flex justify-start">
      <div className="relative pt-[19.2em] h-full w-full">
        <img
          src="/assets/icons/HeroBGLG.png"
          className="h-max object-contain w-full invisible"
          alt=""
        />
        <img
          src="/assets/icons/HeroBGSM.png"
          className="md:hidden object-contain h-max w-full invisible"
          alt=""
        />
      </div>
      <div className=" absolute top-0 h-full w-full"></div>
    </div>
  );
}
