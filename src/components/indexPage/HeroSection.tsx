import React from "react";

export function HeroSection() {
  return (
    <div className="">
      <div className=" flex flex-col items-center sm:bg-heroBGLG bg-heroBGSM h-[320px] sm:h-[600px] bg-contain sm:bg-auto w-full bg-no-repeat bg-scroll bg-center bg-bottom">
        <h1 className="flex items-center text-[52px] font-bold pb-[1.1em] mt-[309px]">
          Stake to Vote, Get More Rewards
        </h1>
        <button className="px-10 py-4 font-roboto leading-4 bg-secondary-beta hover:bg-secondary-beta/90 text-base text-[17px] flex justify-center items-center rounded-full font-bold">
          Stake Now
        </button>
      </div>
    </div>
  );
}
