import type { NextPage } from "next";
import Head from "next/head";
import { createContext, useState } from "react";
import {
  AuditInstitution,
  CallToAction,
  Features,
  Footer,
  HeroSection,
  Navbar,
  SideNavbar,
} from "../components";
import FAQ from "../components/indexPage/FAQ";
import { trpc } from "../utils/trpc";

export const IsSideNavOpen = createContext<{
  isSideNavOpen: Boolean;
  setSideNavOpen: any;
}>({
  isSideNavOpen: false,
  setSideNavOpen: () => {},
});

const Home: NextPage = () => {
  const [isSideNavOpen, setSideNavOpen] = useState<Boolean>(false);
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  // console.log(isSideNavOpen);

  return (
    <div className="h-full w-full">
      <Head>
        <title>EGC Staking | Buy KCS to Vote | KuCoin Community Chain</title>
        <meta
          name="description"
          content="EGC Staking | Buy KCS to Vote | KuCoin Community Chain"
        />
      </Head>
      {isSideNavOpen ? <SideNavbar /> : ""}
      <main
        className={`${
          isSideNavOpen ? "overflow-y-hidden h-full opacity-4 " : "h-auto"
        } z-0 min-h-[calc(-320px_+_100vh)]  w-full text-white text-base duration-500 transition-all `}
      >
        <IsSideNavOpen.Provider value={{ isSideNavOpen, setSideNavOpen }}>
          <Navbar />
        </IsSideNavOpen.Provider>
        <HeroSection />
        <Features />
        <FAQ />
        <CallToAction />
        <AuditInstitution />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
