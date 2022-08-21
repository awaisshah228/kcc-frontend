import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../layout/Layout";
import VotingDetail from "../components/votingPage/VotingDetail";

const Vote: NextPage = () => {
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
      <Layout>
        <div className="m-5 p-5  gap-5  ">
          <VotingDetail></VotingDetail>
          {/* <Validator /> */}
        </div>
      </Layout>
    </div>
  );
};

export default Vote;
