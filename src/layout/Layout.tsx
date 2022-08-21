import { PropsWithChildren } from "react";
import {
  AuditInstitution,
  CallToAction,
  Features,
  Footer,
  HeroSection,
  Navbar,
  SideNavbar,
} from "../components";
import { trpc } from "../utils/trpc";
import { createContext, useState } from "react";
export const IsSideNavOpen = createContext<{
  isSideNavOpen: Boolean;
  setSideNavOpen: any;
}>({
  isSideNavOpen: false,
  setSideNavOpen: () => {},
});

export default function Layout({ children }: PropsWithChildren) {
  const [isSideNavOpen, setSideNavOpen] = useState<Boolean>(false);
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <>
      {isSideNavOpen ? <SideNavbar /> : ""}
      <main
        className={`${
          isSideNavOpen ? "overflow-y-hidden h-full opacity-4 " : "h-auto"
        } z-0 min-h-[calc(-320px_+_100vh)]  w-full text-white text-base duration-500 transition-all `}
      >
        <IsSideNavOpen.Provider value={{ isSideNavOpen, setSideNavOpen }}>
          <Navbar />
        </IsSideNavOpen.Provider>
        <div className="p-auto h-screen mt-24">
          {children}
          <Footer />
        </div>
      </main>
    </>
  );
}
