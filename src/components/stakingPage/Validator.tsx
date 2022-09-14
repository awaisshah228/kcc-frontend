import React, { useContext, useEffect, useState } from "react";
import SingleValid from "./SingleValid";
import { ContractContext } from "../web3";

const Validator = () => {
  const contracts = useContext(ContractContext);
  const [Validators, setValidators] = useState<[]>([]);

  const getData = async () => {
    const numer = await contracts.validatorContract.getTopValidators();
    setValidators(numer);
  };

  useEffect(() => {
    getData();
  }, [contracts]);
  return (
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
                      Validator
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white-900 px-6 py-4 text-left"
                    >
                      Vote/ProPortion
                    </th>

                    <th
                      scope="col"
                      className="text-sm font-medium text-white-900 px-6 py-4 text-left"
                    >
                      EGC/Share(EPS)
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white-900 px-6 py-4 text-left"
                    >
                      Commison Rate
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white-900 px-6 py-4 text-left"
                    >
                      Status
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
                  {Validators.map((value, key) => {
                    return (
                      <tr className="bg-white" key={key}>
                        <SingleValid key={key} address={value} index={key} />
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
  );
};

export default Validator;
