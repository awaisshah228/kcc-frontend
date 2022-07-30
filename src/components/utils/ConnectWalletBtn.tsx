import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
export const ConnectWalletBtn = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        return (
          <div
            className="mr-1 sm:mr-3 scale-75 md:scale-100 text-secondary-alfa"
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <button
                    className={`min-w-max font-bold hover:bg-tertiary-alfa/60  flex items-center space-x-2 border border-secondary-alfa px-6 py-2 rounded-full `}
                    onClick={openConnectModal}
                    type="button"
                  >
                    <Image
                      src="/assets/icons/ConnectWalletIcon.png"
                      height={22}
                      width={25}
                      className="object-contain"
                      alt="Wallet Icon"
                    />
                    <span className="flex">Connect Wallet</span>
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    className={`min-w-max hover:bg-tertiary-alfa/60  border border-secondary-alfa px-6 py-2 rounded-full`}
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </button>
                );
              }
              return (
                <div>
                  <button
                    className={`min-w-max hover:bg-tertiary-alfa/60 font-bold  border border-secondary-alfa px-6 py-2 rounded-full`}
                    onClick={openAccountModal}
                    type="button"
                  >
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
