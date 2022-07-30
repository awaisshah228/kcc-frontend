import Image from "next/image";
import { HiOutlineMenu } from "react-icons/hi";
import { XIcon } from "@heroicons/react/solid";
import React, { useContext, useState } from "react";
import { IsSideNavOpen } from "../../pages";
import { ConnectWalletBtn } from "../utils";

export function Navbar() {
  const { isSideNavOpen, setSideNavOpen } = useContext(IsSideNavOpen);
  return (
    <div
      className={`${
        isSideNavOpen ? "opacity-30 " : ""
      } relative lg:absolute top-0 w-full flex justify-between items-center px-0 pl-2 md:pl-2 md:pr-8 lg:px-[5.4em]`}
    >
      <div className="flex space-x-16 scale-95">
        <Logo />
        <div className="hidden lg:flex">
          <Navigations />
        </div>
      </div>
      <ConnectWalletBtn />
    </div>
  );
}

function Logo() {
  return (
    <div className="flex w-full h-full items-center">
      <MobileResponsive />
      <Image src="/assets/icons/logo.svg" height={80} width={90} alt="Logo" />
    </div>
  );
}

export function Navigations() {
  return (
    <div className="[&_a]:cursor-pointer flex lg:flex-row flex-col lg:space-x-10 h-auto w-max lg:justify-center items-center font-normal relative -top-[2px] text-base text-secondary-alfa">
      <a>Home</a>
      <a>Staking</a>
      <a>My Vote</a>
    </div>
  );
}



function MobileResponsive() {
  const [isOpen, setOpen] = useState<Boolean>(false);
  const { isSideNavOpen, setSideNavOpen } = useContext<{
    isSideNavOpen: Boolean;
    setSideNavOpen: (isSideNavOpen: Boolean) => any;
  }>(IsSideNavOpen);

  if (isOpen !== isSideNavOpen) {
    setSideNavOpen(isOpen);
  }
  return (
    <div className="lg:hidden text-secondary-alfa ml-3 mr-2 md:mr-4 text-2xl h-full flex items-center">
      <button
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        {isOpen ? (
          <XIcon className="h-6 object-contain font-bold" />
        ) : (
          <HiOutlineMenu />
        )}
      </button>
    </div>
  );
}
