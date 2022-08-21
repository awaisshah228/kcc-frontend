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

// const kccChain: Chain = {
//   id: 321,
//   name: "KCC",
//   network: "KCC-MAINNET",
//   iconUrl: "https://example.com/icon.svg",
//   iconBackground: "#fff",
//   nativeCurrency: {
//     decimals: 18,
//     name: "KCC",
//     symbol: "KCS",
//   },
//   rpcUrls: {
//     default: "https://rpc-mainnet.kcc.network",
//   },
//   blockExplorers: {
//     default: { name: "KCC Explorer", url: "https://explorer.kcc.io/en" },
//     // etherscan: { name: "SnowTrace", url: "https://snowtrace.io" },
//   },
//   testnet: false,
// };
const kccChainTest: Chain = {
  id: 322,
  name: "KCC-TEST",
  network: "KCC-TESTNET",
  iconUrl: "https://example.com/icon.svg",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "KCC",
    symbol: "KCS",
  },
  rpcUrls: {
    default: "https://rpc-testnet.kcc.network",
  },
  blockExplorers: {
    default: { name: "Scan Testnet", url: "https://scan-testnet.kcc.network" },
    // etherscan: { name: "SnowTrace", url: "https://snowtrace.io" },
  },
  testnet: true,
};

export const { provider, chains } = configureChains(
  [chain.ropsten],
  [
    publicProvider(),
    // jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) }),
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
