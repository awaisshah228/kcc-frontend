import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ContractContext } from "../web3";
import * as cheerio from "cheerio";
import VoteModal from "./VoteModel";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
// const getMetaData = require("metadata-scraper");

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
};

const SingleValid = (props: typeSingleValid) => {
  const [details, setdetails] = useState<DetailsSingle>();

  // const [open, setopen] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const [vote, setVote] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  // function onChange(e){
  //   const re = /^[0-9\b]+$/;
  //   if (e.target.value === '' || re.test(e.target.value)) {
  //      setVote({value: e.target.value})
  //   }
  const contracts = useContext(ContractContext);
  const getData = async () => {
    try {
      let details = await contracts.validatorContract.candidateInfos(
        props.address
      );
      let url = details[0];
      let resObj: DetailsSingle = { title: "", favIcon: "", image: "" };
      // console.log(url);
      await axios.get(url).then((res) => {
        console.log(res.data);

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
        console.log(resObj);
        // setdetails(resObj);
      });

      let votes = await contracts.validatorContract.getPoolvoterNumber(
        props.address
      );
      let commison = await contracts.validatorContract.getPoolfeeShares(
        props.address
      );
      let isActive = await contracts.validatorContract.isActiveValidator(
        props.address
      );
      console.log(isActive);
      setdetails({
        ...resObj,
        vote: BigInt(votes).toString(10),
        commison: eval(BigInt(commison).toString(10) + "/10000"),
        status: isActive,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [contracts, details]);
  return (
    <>
      {details && (
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
                            onChange={(e) => setVote(e.target.value)}
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

                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Got it, thanks!
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
    </>
  );
};

export default SingleValid;
