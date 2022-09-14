import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../layout/Layout";
import DetailBar from "../components/stakingPage/DetailBar";
import Validator from "../components/stakingPage/Validator";

const Home: NextPage = () => {
  // console.log(isSideNavOpen);

  return (
    <div className="h-full w-full">
      <Head>
        <title>EGC Staking | Buy EGC to Vote | KuCoin Community Chain</title>
        <meta
          name="description"
          content="EGC Staking | Buy EGC to Vote | KuCoin Community Chain"
        />
      </Head>
      <Layout>
        <div className="m-5 p-5 flex flex-col gap-5 justify-center">
          <DetailBar></DetailBar>
          <Validator />
        </div>
      </Layout>
    </div>
  );
};

export default Home;
