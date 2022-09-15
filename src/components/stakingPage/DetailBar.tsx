import React, { useContext, useEffect, useState } from "react";
import { useBalance, useAccount, useContractReads } from "wagmi";
import { ContractContext } from "../web3";
const DetailBar = () => {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  });
  const [balance, setBalance] = useState<string>("0");
  const [symbols, setSymobols] = useState<string>("");
  const contracts = useContext(ContractContext);
  const [activeValid, setActiveValid] = useState<number>();
  const [activeValidorinfo, setActiveValidtorInfo] = useState<[]>([]);
  const [totalVotes, setTotalVote] = useState<string>("0");

  const {
    data: data2,
    isError: isError2,
    isLoading: isLoading2,
  } = useContractReads({
    contracts: [
      {
        ...contracts.validatorConst,
        functionName: "getActiveValidators()",
      },
      {
        ...contracts.validatorConst,
        functionName: "totalBallot()",
      },
    ],
  });

  const getData = async (data2: any) => {
    console.log(data2);
    // const numer = await contracts.validatorContract.getActiveValidators();
    // const votes = await contracts.validatorContract.totalBallot();
    // console.log(BigInt(votes).toString(10));
    setActiveValidtorInfo(data2["https://awaisshah228.vercel.app/"]);
    setTotalVote(BigInt(data2[1]).toString(10));
    setActiveValid(data2[0].length);
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
    <div className="flex w-full m-auto p-auto flex-row  justify-between">
      <div>Validators: {activeValid}</div>
      <div>Total Votes:{totalVotes}</div>
      <div>
        Balance:
        {isConnected ? balance : 0.0} {symbols}
      </div>
    </div>
  );
};

export default DetailBar;
