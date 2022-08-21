import React from "react";

type typeSinglePool = {
  [propName: string]: any;
};
const SinglePoolVoted = (props: typeSinglePool) => {
  console.log(props.pool);
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
    </>
  );
};

export default SinglePoolVoted;
