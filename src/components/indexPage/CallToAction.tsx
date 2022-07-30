import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Image from "next/image";
import React from "react";

export function CallToAction() {
  return (
    <div className="my-24 w-full text-center ">
      <div className="w-full font-bold text-4xl">To be a validator</div>
      <div className="flex flex-col lg:flex-row justify-center lg:justify-evenly items-center w-full h-full py-10">
        <CtaCard {...{
            image_Url: "/assets/icons/ApplyCTA.png",
            title: "Apply"
        }} />
        <CtaCard {...{
            image_Url: "/assets/icons/candidateKYCcta.png",
            title: "Candidate KYC"
        }} />
        <CtaCard {...{
            image_Url: "/assets/icons/votingAsAVoteCTA.png",
            title: "Voting as a Vote"
        }} />
      </div>
    </div>
  );
}

function CtaCard({ image_Url, title }: { image_Url: string; title: string }) {
  return (
    <div className="group w-max h-max pt-16 pb-8 px-4 rounded-2xl cta-card-gradient flex flex-col justify-center">
      <Image
        src={image_Url}
        className="shadow-2xl shadow-black object-contain"
        height={140}
        width={200}
        alt={image_Url}
      />
      <div className="text-lg">{ title }</div>
      <div className="invisible group-hover:visible flex items-center h-full w-full text-secondary-alfa text-center justify-center">
        Learn More <HiOutlineArrowNarrowRight className="w-8 h-4" />
      </div>
    </div>
  );
}
