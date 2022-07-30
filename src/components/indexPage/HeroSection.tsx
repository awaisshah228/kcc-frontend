import React from "react";

export function HeroSection() {
  return (
    <div className="">
      <div className="flex flex-col items-center sm:bg-heroBGLG bg-heroBGSM h-[320px] sm:h-[600px] bg-contain sm:bg-auto w-full bg-no-repeat bg-scroll bg-center bg-bottom">
        <h1 className="leading-normal flex items-center text-[32px] max-w-[300px] lg:max-w-full lg:text-[52px] font-bold lg:pb-[.5em]  pb-[16px] lg:mt-[282px] mt-[103px] lg:text-left text-center">
          Stake to Vote, Get More Rewards
        </h1>
        <button className="px-8 lg:px-10 py-3 lg:py-4 font-roboto leading-4 bg-secondary-beta hover:bg-secondary-beta/90 text-base text-[17px] flex justify-center items-center rounded-full font-bold">
          Stake Now
        </button>
      </div>
    </div>
  );
}
