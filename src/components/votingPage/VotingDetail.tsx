import { AnyAaaaRecord } from "dns";
import React, { useContext, useEffect, useState } from "react";
import { useBalance, useAccount, useContractRead } from "wagmi";
import { ContractContext } from "../web3";
import SinglePoolVoted from "./SinglePoolVoted";
const VotingDetail = () => {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  });
  const [balance, setBalance] = useState<string>("0");
  const [symbols, setSymobols] = useState<string>("");
  const contracts = useContext(ContractContext);
  const [activeValid, setActiveValid] = useState<number>();
  const [totalVotes, setTotalVote] = useState<string>("0");
  const [poolsVoted, setpoolsVoted] = useState<[]>([]);

  const {
    data: data2,
    isError: isError2,
    isLoading: isLoading2,
  } = useContractRead({
    ...contracts.validatorConst,
    functionName: "getUserVotingSummary(address)",
    args: [address],
  });

  const getData = async (data2: any) => {
    let totalVote = 0;
    let poolVoted = [];
    // console.log(BigInt(data2[0].ballot).toString(10));

    data2?.forEach((item: any) => {
      totalVote = +BigInt(item.ballot).toString(10) ?? 0;
    });
    setpoolsVoted(data2);
    setTotalVote(totalVote.toString());

    // const numer = await contracts.validatorContract.getActiveValidators();
    // const votes = await contracts.validatorContract.totalBallot();
    // console.log(BigInt(votes).toString(10));
    // setActiveValidtorInfo(data2[0]);
    // setTotalVote(BigInt(data2[1]).toString(10));
    // setActiveValid(data2[0].length);
    // setActiveValid(numer.lenght);
  };

  useEffect(() => {
    getData(data2);
    const amount = parseFloat(data?.formatted!).toFixed(5);
    const sign: string = data?.symbol!;
    setBalance(amount ?? 0);
    setSymobols(sign);
  }, [contracts, data, data2]);

  return (
    <div>
      <div className="flex w-full m-auto p-auto flex-row  justify-between">
        <div>Total Voted: {totalVotes}</div>
        {/* <div>Accumaletd Rewards:{totalVotes}</div> */}
        <div>
          Balance:
          {isConnected ? balance : 0.0} {symbols}
        </div>
      </div>
      <div className="flex flex-col gap-5 justify-center mt-10">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b bg-slate-900">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white-900 px-6 py-4 text-left"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white-900 px-6 py-4 text-left"
                      >
                        Validator Address
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white-900 px-6 py-4 text-left"
                      >
                        Ballot
                      </th>

                      <th
                        scope="col"
                        className="text-sm font-medium text-white-900 px-6 py-4 text-left"
                      >
                        Pending Reward
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white-900 px-6 py-4 text-left"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {poolsVoted?.map((value, key) => {
                      return (
                        <tr className="bg-white" key={key}>
                          <SinglePoolVoted key={key} pool={value} index={key} />
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingDetail;
