import React, { useContext } from "react";
import { toast } from "react-toastify";
import { useAccount, useContractWrite } from "wagmi";
import { ContractContext } from "../web3";

type typeSinglePool = {
  [propName: string]: any;
};
const SinglePoolVoted = (props: typeSinglePool) => {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const contracts = useContext(ContractContext);

  const {
    data: dataWithdraw,
    isLoading: Loadinngwtihdraw,
    isSuccess: isSuccessWithdrwa,
    write: withdraw,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    ...contracts.validatorConst,
    functionName: "claimReward",
    args: [props.pool.validator],
    onError(error: any) {
      // console.log(JSON.stringify(error.reason));
      toast(error.reason, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  return (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {props.index + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {props.pool.validator}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {BigInt(props.pool.ballot).toString(10) ?? 0}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {BigInt(props.pool.pendingReward).toString(10) ?? 0}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() =>
            isConnected
              ? withdraw?.()
              : toast("Connect Wallet Before", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                })
          }
        >
          Claim Reward
        </button>
      </td>
    </>
  );
};

export default SinglePoolVoted;
