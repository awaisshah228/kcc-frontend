import React, { FC } from "react";
import { DisclosureFAQ } from "../utils";

export default function FAQ() {
  return (
    <div className="py-[5em] flex flex-col items-center">
      <div className="text-center w-full text-4xl font-bold">FAQ</div>
      <div className="px-2 mt-14 mb-10 w-full flex items-center flex-col space-y-4">
        <DisclosureFAQ key={1} {...{ FAQData }} />
      </div>
      <div className="text-base font-roboto">More</div>
    </div>
  );
}

const FAQData: FAQDataType[] = [
  {
    id: "disclosure-panel-1",
    isOpen: false,
    Question: "1.How to participate in KCS staking?",
    Answer: () => {
      return (
        <div className="space-y-2">
          <div className="">
            By staking KCS, users can participate in node elections on KuCoin
            Community Chain (KCC) and earn rewards. Staking KCS is critical for
            securing the network.
          </div>
          <div className="">
            Validators can stake KCS to themselves or receive votes from users.
          </div>
          <div className="">
            Users can vote for validators by staking KCS, in which 1 KCS
            represents 1 vote. If users redeem votes, their KCS will also be
            returned.
          </div>
        </div>
      );
    },
  },
  {
    id: "disclosure-panel-2",
    isOpen: false,
    Question: "2.How to check or claim staking rewards?",
    Answer: () => {
      return (
        <div className="space-y-2">
          <div className="">
            {`1.Users can check their rewards details on "My Vote"`}
          </div>
          <div className="">
            {`2.Users can claim their rewards by clicking "Claim"`}
          </div>
        </div>
      );
    },
  },
  {
    id: "disclosure-panel-3",
    isOpen: false,
    Question: "3.How to redeem staked KCS?",
    Answer: () => {
      return (
        <div className="space-y-2">
          <div className="">{`1.Click "My Vote"`}</div>
          <div className="">{`2.Click "Redeem" to stop staking`}</div>
          <div className="">
            {`3.KCS will be available to withdraw after a 3-day lockup period. During the lockup period, no more rewards will be generated.`}
          </div>
        </div>
      );
    },
  },
];

export type FAQDataType = {
  id: string;
  isOpen: Boolean;
  Question: string;
  Answer: FC;
};
