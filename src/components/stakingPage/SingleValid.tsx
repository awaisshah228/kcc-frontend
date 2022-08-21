import axios from "axios";
import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  Fragment,
} from "react";
import { ContractContext } from "../web3";
import * as cheerio from "cheerio";
import { Dialog, Transition } from "@headlessui/react";
import {
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useAccount,
} from "wagmi";
import { useSigner, useContract } from "wagmi";
import { ethers } from "ethers";
import { toast } from "react-toastify";
type typeSingleValid = {
  address: string;
  index: number;
};
type DetailsSingle = {
  title: string;
  favIcon: string;
  image: string;
  vote?: string;
  commison?: string;
  status?: string;
  eps?: string;
};

const SingleValid = (props: typeSingleValid) => {
  const [details, setdetails] = useState<DetailsSingle>();

  // const [open, setopen] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const [vote, setVote] = useState<number>(0);
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { data: signer, isError: errr, isLoading: loadd } = useSigner();
  // console.log(signer);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const contracts = useContext(ContractContext);
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...contracts.validatorConst,
        functionName: "candidateInfos",
        args: [props.address],
      },
      {
        ...contracts.validatorConst,
        functionName: "getPoolsuppliedBallot",
        args: [props.address],
      },
      {
        ...contracts.validatorConst,
        functionName: "getPoolfeeShares",
        args: [props.address],
      },
      {
        ...contracts.validatorConst,
        functionName: "isActiveValidator",
        args: [props.address],
      },
      {
        ...contracts.validatorConst,
        functionName: "getPoolaccRewardPerShare",
        args: [props.address],
      },
    ],
  });

  // vote

  const {
    data: dataWrite,
    isLoading: LoadingVote,
    isSuccess,
    write: castVote,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    ...contracts.validatorConst,
    functionName: "vote",
    args: [props.address],
    overrides: {
      from: address,
      value: ethers.utils.parseEther(vote.toString()),
    },
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

  //revoke
  const {
    data: data4,
    isLoading: LoadingRevoke,
    isSuccess: isSuccessRevoke,
    write: revokeVote,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    ...contracts.validatorConst,
    functionName: "revokeVote",
    args: [props.address, vote],
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
  //withdraw
  const {
    data: dataWithdraw,
    isLoading: Loadinngwtihdraw,
    isSuccess: isSuccessWithdrwa,
    write: withdraw,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    ...contracts.validatorConst,
    functionName: "withdraw",
    args: [props.address],
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
  // console.log(data);
  // get data
  const getData = useCallback(
    async (data: any) => {
      try {
        let url = data[0][0];
        let resObj: DetailsSingle = { title: "", favIcon: "", image: "" };

        await axios.get(url).then((res) => {
          // console.log(res.data);

          //set a reference to the document that came back
          let $ = cheerio.load(res.data),
            //create a reference to the meta elements
            $title = $("head title").text(),
            $favIcon = $('link[rel="icon"]').attr("href"),
            $images = $("img"),
            $ogImage = $('meta[property="og:image"]').attr("content");
          if ($title) {
            resObj.title = $title;
            resObj.favIcon = url + $favIcon!;
            resObj.image = $ogImage!;
          }
          // console.log(resObj);
          // setdetails(resObj);
        });
        console.log(data);

        setdetails({
          ...resObj,
          vote: BigInt(data[1]).toString(10),
          commison: eval(BigInt(data[2]).toString(10) + "/10000"),
          status: data[3],
          eps: eval(BigInt(data[4]).toString(10) + "/10**12"),
        });
      } catch (error) {
        console.log(error);
      }
    },
    [data]
  );

  // stake and vote
  // const stakeVote = useCallback(
  //   async (ans: any) => {
  //     try {
  //       // co
  //       // console.log(ans);
  //       console.log(localStorage.getItem(signer));
  //       // let tx = validatorContract.vote(props.address, {
  //       //   value: 10 * 18,
  //       // });
  //       // console.log(tx);s
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   [contracts]
  // );

  useEffect(() => {
    getData(data);
    console.log(data);
  }, [contracts, data, vote]);
  return (
    <>
      {data && (
        <>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {props.index + 1}
          </td>
          <td className="flex flex-row gap-2  gap-3text-sm text-gray-900 font-light px-6 py-4 ">
            <img src={details?.favIcon} alt="" />
            {details?.title}
          </td>
          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {details?.vote}
          </td>
          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {details?.eps}
          </td>
          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {details?.commison}
          </td>

          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {details?.status ? "Active" : "InActive"}
          </td>
          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={openModal}
            >
              Vote
            </button>
          </td>
          {/* <VoteModal control={open} /> */}

          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        {details?.title}
                      </Dialog.Title>
                      <div
                        className="bg-teal-100 border-t-4 m-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                        role="alert"
                      >
                        <div className="flex">
                          <div className="py-1">
                            <svg
                              className="fill-current h-6 w-6 text-teal-500 mr-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm">
                              1 KCS represents 1 vote. Please enter integers and
                              at least reserve 0.01 KCS as a gas fee. You can
                              redeem votes on “My Vote”. But the KCS staked will
                              be locked for 3 days before withdrawing
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Your payment has been successfully submitted. We’ve
                          sent you an email with all of the details of your
                          order.
                        </p>
                      </div>

                      <div className="flex justify-center">
                        <div className="mb-3 xl:w-96">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label inline-block mb-2 text-gray-700"
                          >
                            Vote
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={vote}
                            onChange={(e) => setVote(Number(e.target.value))}
                            className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
                            id="exampleFormControlInput1"
                            placeholder="Enter in Integer Number"
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex gap-3">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() =>
                            isConnected
                              ? castVote?.()
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
                          Vote
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() =>
                            isConnected
                              ? revokeVote?.()
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
                          Revoke Vote
                        </button>
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
                          Withdraw
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      )}
      {/* ToastContainer/ */}
    </>
  );
};

export default SingleValid;
