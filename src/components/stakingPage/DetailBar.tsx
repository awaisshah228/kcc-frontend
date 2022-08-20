import React, { useContext, useEffect, useState } from "react";
import { useBalance, useAccount } from "wagmi";
import { ContractContext } from "../web3";
const DetailBar = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  });
  const [balance, setBalance] = useState<string>();
  const [symbols, setSymobols] = useState<string>("");
  const contracts = useContext(ContractContext);
  const [activeValid, setActiveValid] = useState<number>();
  const [activeValidorinfo, setActiveValidtorInfo] = useState<[]>([]);
  const [totalVotes, setTotalVote] = useState<string>("0");

  const getData = async () => {
    const numer = await contracts.validatorContract.getActiveValidators();
    const votes = await contracts.validatorContract.totalBallot();
    // console.log(BigInt(votes).toString(10));
    setTotalVote(BigInt(votes).toString(10));
    setActiveValidtorInfo(numer);
    setActiveValid(numer.length);
    // setActiveValid(numer.lenght);
  };

  useEffect(() => {
    getData();
    const amount = parseFloat(data?.formatted!).toFixed(5);
    const sign: string = data?.symbol!;
    setBalance(amount);
    setSymobols(sign);
  }, [contracts, data]);

  return (
    <div className="flex w-full m-auto p-auto flex-row  justify-between">
      <div>Validators: {activeValid}</div>
      <div>Total Votes:{totalVotes}</div>
      <div>
        Balance:
        {balance} {symbols}
      </div>
    </div>
  );
};

export default DetailBar;
