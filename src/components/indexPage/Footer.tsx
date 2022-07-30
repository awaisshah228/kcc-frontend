import Image from "next/image";
import React, { FC } from "react";
import { DisclosureFooter } from "../utils/DisclosureFooter";

export function Footer() {
  return (
    <footer className="px-5 lg:px-20 flex flex-col justify-center items-center bg-tertiary-alfa">
      <div className="lg:!flex hidden container footer justify-between py-12 text-base-content border-b border-b-white/50">
        <div className="w-44">
          <Image
            src="/assets/icons/logo.svg"
            className="object-contain"
            height={40}
            width={90}
            alt="logo"
          />
        </div>
        <div>
          <span className="footer-title">About Us</span>
          <AboutUs />
        </div>

        <div>
          <span className="footer-title">Tools</span>
          <Tools />
        </div>

        <div>
          <span className="footer-title">Community</span>
          <Community />
        </div>

        <div>
          <span className="footer-title">Event</span>
          <Event />
        </div>

        <div>
          <span className="footer-title">Contact</span>
          <Contact />
        </div>
      </div>
      <div className="w-full lg:hidden">
        <DisclosureFooter key={0} {...{ FooterData }} />
      </div>
      <div className="lg:text-left text-center mt-12 lg:mt-5 mb-6 lg:mb-10 font-roboto font-light container text-xs lg:text-sm text-white/80">
        CopyRight © 2022 staking.kcc.io All Rights Reserved.
      </div>
    </footer>
  );
}

function AboutUs() {
  return (
    <>
      <a className="link link-hover">Announcement</a>
      <a className="link link-hover">Risk Statement</a>
      <a className="link link-hover">DisClaimers</a>
    </>
  );
}

function Tools() {
  return (
    <>
      <a className="link link-hover">Docs</a>
      <a className="link link-hover">Github</a>
      <a className="link link-hover">Testnet Explorer</a>
      <a className="link link-hover">Testnet Faucet</a>
    </>
  );
}

function Community() {
  return (
    <>
      <a className="link link-hover">Telegram</a>
      <a className="link link-hover">Twitter</a>
      <a className="link link-hover">Discord</a>
      <a className="link link-hover">Medium</a>
    </>
  );
}

function Event() {
  return (
    <>
      <a className="link link-hover">Unicorn Contest</a>
    </>
  );
}

function Contact() {
  return (
    <>
      <a className="link link-hover">Techincal Support</a>
      <a className="link link-hover">FAQ</a>
    </>
  );
}

const FooterData: FooterDataType[] = [
  {
    id: "disclosure-panel-1",
    isOpen: false,
    Question: "About Us",
    Answer: AboutUs,
  },
  {
    id: "disclosure-panel-2",
    isOpen: false,
    Question: "Tools",
    Answer: Tools,
  },
  {
    id: "disclosure-panel-3",
    isOpen: false,
    Question: "Community",
    Answer: Community,
  },
  {
    id: "disclosure-panel-4",
    isOpen: false,
    Question: "Event",
    Answer: Event,
  },
  {
    id: "disclosure-panel-5",
    isOpen: false,
    Question: "Contact",
    Answer: Contact,
  },
];

export type FooterDataType = {
  id: string;
  isOpen: Boolean;
  Question: string;
  Answer: FC;
};
