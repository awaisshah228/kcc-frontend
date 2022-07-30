import { ChevronUpIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { FooterDataType } from "../indexPage";

export function DisclosureFooter({ FooterData }: { FooterData: FooterDataType[] }) {
  const [disclosures, setDisclosures] = useState(FooterData);

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
    <div className="w-full rounded-lg bg-tertiary-alfa font-roboto flex flex-col justify-center text-white">
      {disclosures.map(({ id, isOpen, Question, Answer }: any) => (
        <React.Fragment key={id}>
          <button
            className={`flex w-full items-center justify-between rounded-lg  px-5 py-3 text-left font-normal`}
            onClick={() => handleClick(id)}
            aria-expanded={isOpen}
            {...(isOpen && { "aria-controls": id })}
          >
            <span className="text-sm font-medium font-barlow">{Question}</span>
            <ChevronUpIcon
              className={`
                  ${
                    isOpen ? "rotate-180 transform" : "rotate-180"
                  } h-5 w-3  text-white`}
            />
          </button>
          {isOpen && (
            <div className="px-2 py-4 pl-8 text-sm text-white flex flex-col space-y-2">
              {<Answer />}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
