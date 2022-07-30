import Image from "next/image";
import React from "react";

export function Features() {
  return (
    <div className=" pt-[140px] pb-[80px] w-full h-auto flex flex-col justify-center items-center space-y-[120px]">
      <div className="font-bold max-w-[250px] text-center text-xl lg:text-4xl">
        Stake, Vote and get rewards in 4 steps
      </div>
      <div className="space-y-4 lg:space-y-0  flex justify-center flex-col lg:flex-row flex-wrap px-10">
        <StepCard
          {...{
            dashedLine: true,
            image_URL: "/assets/icons/connect-wallet.png",
            title: "1. Connect Wallet",
            slug: "Buy KCS to join stake",
          }}
        />
        <StepCard
          {...{
            dashedLine: true,
            image_URL: "/assets/icons/stake-to-vote.png",
            title: "2. Stake to vote",
            slug: "Vote for master node candidates by stake KCS, 1 KCS represents 1 vote.",
          }}
        />
        <StepCard
          {...{
            dashedLine: true,
            image_URL: "/assets/icons/check-votes.png",
            title: "3. Check votes",
            slug: 'Check votes on "My Vote"',
          }}
        />
        <StepCard
          {...{
            dashedLine: false,
            image_URL: "/assets/icons/get-rewards.png",
            title: "4. Get rawards",
            slug: 'Claim rewards on "My Vote"',
          }}
        />
      </div>
    </div>
  );
}

function StepCard({
  dashedLine,
  image_URL,
  title,
  slug,
}: {
  dashedLine: Boolean;
  image_URL: string;
  title: string;
  slug: string;
}) {
  return (
    <div className=" relative  h-full w-full lg:w-max lg:h-max flex justify-center items-center lg:flex-row flex-col space-y-7 lg:space-y-0">
      <div className="h-full lg:w-max w-full space-y-7 flex-col lg:flex-row justify-center items-center text-center lg:text-left">
        <div className="flex justify-center items-center relative lg:w-max w-full">
          <Image
            src={image_URL}
            className="object-contain min-w-max"
            height={114}
            width={93}
            alt={image_URL}
          />
          <div className="hidden lg:block w-max h-max">
            {dashedLine ? (
              <div className="w-[169px] h-[1px] border border-white/40 border-dashed mx-10"></div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="space-y-4 w-full max-w-[17em]">
          <h3 className="hover:underline hover:text-secondary-alfa font-bold text-2xl">
            {title}
          </h3>
          <div className="font-roboto text-[.8rem]">{slug}</div>
        </div>
      </div>
      <div className="lg:hidden">
        {dashedLine ? (
          <div className="h-[169px] w-[1px] border border-white/40 border-dashed mx-12"></div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
