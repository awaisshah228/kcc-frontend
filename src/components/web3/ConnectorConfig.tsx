import "@rainbow-me/rainbowkit/styles.css";

import React, { PropsWithChildren, createContext } from "react";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  Chain,
} from "@rainbow-me/rainbowkit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { Chain, getDefaultWallets } from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
  useContract,
  useSigner,
  useProvider,
} from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import validatorAbi from "../../constonts/abi/Validators.json";
import constAddress from "../../constonts/address";

const egcChain: Chain = {
  id: 790,
  name: "EgonChain",
  network: "EgonChain",
  iconUrl: "https://example.com/icon.svg",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "EGC",
    symbol: "EGON",
  },
  rpcUrls: {
    default: "https://egoncoin.org",
  },
  blockExplorers: {
    default: { name: "EGC Explorer", url: "http://80.240.30.222:4000" },
    // etherscan: { name: "SnowTrace", url: "https://snowtrace.io" },
  },
  testnet: false,
};
// const kccChainTest: Chain = {
//   id: 322,
//   name: "EGC-TEST",
//   network: "EGC-TESTNET",
//   iconUrl: "https://example.com/icon.svg",
//   iconBackground: "#fff",
//   nativeCurrency: {
//     decimals: 18,
//     name: "EGC",
//     symbol: "EGC",
//   },
//   rpcUrls: {
//     default: "https://rpc-testnet.EGC.network",
//   },
//   blockExplorers: {
//     default: { name: "Scan Testnet", url: "https://scan-testnet.EGC.network" },
//     // etherscan: { name: "SnowTrace", url: "https://snowtrace.io" },
//   },
//   testnet: true,
// };

export const { provider, chains } = configureChains(
  [egcChain],
  [
    // publicProvider(),
    jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
export const ContractContext = createContext<any>(null);

export function Web3ConnectorConfig({ children }: PropsWithChildren) {
  const validatorConst = {
    addressOrName: constAddress.validatorAddress,
    contractInterface: validatorAbi,
  };

  const provider = useProvider();

  const validatorContract = useContract({
    addressOrName: constAddress.validatorAddress,
    contractInterface: validatorAbi,
    signerOrProvider: provider,
  });
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#FF9200",
            accentColorForeground: "white",
            borderRadius: "large",
            overlayBlur: "large",
            fontStack: "rounded",
          })}
          coolMode
          chains={chains}
        >
          <ContractContext.Provider
            value={{ validatorContract, validatorConst }}
          >
            {children}
          </ContractContext.Provider>
        </RainbowKitProvider>
      </WagmiConfig>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
