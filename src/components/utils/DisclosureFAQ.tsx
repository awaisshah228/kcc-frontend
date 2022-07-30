import { ChevronUpIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { FAQDataType } from "../indexPage";

export function DisclosureFAQ({ FAQData }: { FAQData: FAQDataType[] }) {
  const [disclosures, setDisclosures] = useState(FAQData);

  const handleClick = (id: string) => {
    setDisclosures(
      disclosures.map((disclosure: any) =>
        disclosure.id === id
          ? { ...disclosure, isOpen: !disclosure.isOpen }
          : { ...disclosure, isOpen: false }
      )
    );
  };

  return (
    <div className="mx-auto w-full rounded-lg max-w-[1200px] bg-tertiary-alfa font-roboto flex flex-col justify-center text-white">
      {disclosures.map(({ id, isOpen, Question, Answer }: any) => (
        <React.Fragment key={id}>
          <button
            className={`flex w-full items-center justify-between rounded-lg  px-5 py-[1.6em] text-left font-normal ${
              isOpen ? "border-b border-white/20 rounded-none" : ""
            }`}
            onClick={() => handleClick(id)}
            aria-expanded={isOpen}
            {...(isOpen && { "aria-controls": id })}
          >
            <span className="text-[18px] font-barlow">{Question}</span>
            <ChevronUpIcon
              className={`
                  ${
                    isOpen ? "rotate-180 transform" : "rotate-90"
                  } h-5 w-5 text-white`}
            />
          </button>
          {isOpen && (
            <div className="px-6 py-4 pl-8 text-sm text-white">
              {<Answer />}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
