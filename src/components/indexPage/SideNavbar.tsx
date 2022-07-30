import React from "react";
import { Navigations } from "./Navbar";

export function SideNavbar() {
  return (
    <div className="z-10 absolute bottom-0 top-20 bg-primary-alfa/70 w-full h-auto">
      <div className="z-50 text-secondary-alfa  w-[69%] mobile-responsive-drawer h-full flex justify-center pt-14 [&_div]:font-normal [&_div]:space-y-10">
        <Navigations />
      </div>
    </div>
  );
}
