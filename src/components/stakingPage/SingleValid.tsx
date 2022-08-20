import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ContractContext } from "../web3";
import * as cheerio from "cheerio";
// const getMetaData = require("metadata-scraper");

type typeSingleValid = {
  address: string;
  index: number;
};
type DetailsSingle = {
  title: string;
  favIcon: string;
  image: string;
};

const SingleValid = (props: typeSingleValid) => {
  const [details, setdetails] = useState<DetailsSingle>();
  const contracts = useContext(ContractContext);
  const getData = async () => {
    try {
      let details = await contracts.validatorContract.candidateInfos(
        props.address
      );
      let url = details[0];
      // console.log(url);
      await axios.get(url).then((res) => {
        console.log(res.data);
        let resObj: DetailsSingle = { title: "", favIcon: "", image: "" },
          //set a reference to the document that came back
          $ = cheerio.load(res.data),
          //create a reference to the meta elements
          $title = $("head title").text(),
          $favIcon = $('link[rel="icon"]').attr("href"),
          $images = $("img"),
          $ogImage = $('meta[property="og:image"]').attr("content");

        // $desc = $('meta[name="description"]').attr('content'),
        // $kwd = $('meta[name="keywords"]').attr('content'),
        // $ogTitle = $('meta[property="og:title"]').attr('content'),
        // $ogImage = $('meta[property="og:image"]').attr('content'),
        // $ogkeywords = $('meta[property="og:keywords"]').attr('content'),

        if ($title) {
          resObj.title = $title;
          resObj.favIcon = url + $favIcon!;
          resObj.image = $ogImage!;
        }
        console.log(resObj);
        setdetails(resObj);
      });
      // let data = await getMetaData(url);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [contracts]);
  return (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {props.index + 1}
      </td>
      <td className="flex flex-row gap-2  gap-3text-sm text-gray-900 font-light px-6 py-4 ">
        <img src={details?.favIcon} alt="" />
        {details?.title}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        Wild
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        @twitter
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        @twitter
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        @twitter
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        @twitter
      </td>
    </>
  );
};

export default SingleValid;
